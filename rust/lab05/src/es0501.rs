#![allow(warnings)]

pub mod mem_inspect {

    // dump object info:
    // size, address, bytes
    pub fn dump_object<T>(obj: &T) {
        let ptr = obj as *const T as *const u8;
        let _size = size_of::<T>();
        let _ptr = ptr as usize;
        println!("Object size: {_size}; address: {_ptr:x}");

        dump_memory(ptr, _size);
    }

    // dump memory info
    pub fn dump_memory(start: *const u8, size: usize) {
        let bytes = unsafe { std::slice::from_raw_parts(start, size) };

        println!("Bytes:");
        for (i, byte) in bytes.iter().enumerate() {
            print!("{:02x} ", byte);
            if i % 8 == 7 {
                println!();
            }
        }
        println!()
    }

    #[test]
    fn dump_object_example() {
        let s = "hello".to_string();
        dump_object(&s);

        let b = Box::new(s);
        // before running try to answer:
        // 1. what is the size of b?
        // 2. what is the content of b?
        dump_object(&b);

        // how to the the pointer of the wrapped object?
        let ptr = b.as_ref() as *const String as *const u8;
        println!("Pointer: {ptr:?}");

        assert!(true);
    }
}

pub mod List1 {

    #[derive(Debug)]
    pub enum Node<T> {
        Cons(T, Box<Node<T>>),
        Nil,
    }

    #[derive(Debug)]
    pub struct List<T> {
        head: Node<T>,
    }

    impl<T> List<T> {
        pub fn new() -> Self {
            Self { head: Node::Nil }
        }

        // insert a new element at the beginning of the list
        // you may encouter a problem with the borrow checker while trying to move self.head to a new variable
        // problem:
        // 1. you need to build a new list Node (elem: elem, self.head)
        // 2. but you can't move self.head, because self.head would be undefined
        // 3. you can't copy it either, because Box can't be copied
        // solution: use mem::replace to move the value of self.head into a new variable and replace it with Nil
        // 4. let self.head point to the new created node
        pub fn push(&mut self, elem: T) {
            let old_head = std::mem::replace(&mut self.head, Node::Nil);
            let new_head = Node::Cons(elem, Box::new(old_head));
            self.head = new_head;
        }

        // pop the first element of the list and return it
        fn pop(&mut self) -> Option<T> {
            match std::mem::replace(&mut self.head, Node::Nil) {
                Node::Nil => None,
                Node::Cons(val, next) => {
                    self.head = *next;
                    Some(val)
                }
            }
        }

        // return a referece to the first element of the list
        pub fn peek(&self) -> Option<&T> {
            match &self.head {
                Node::Nil => None,
                Node::Cons(val, next) => Some(&val),
            }
        }

        // uncomment after having implemented the ListIter struct
        // return an interator over the list values
        pub fn iter(&self) -> ListIter<T> {
            ListIter {
                current: &self.head,
            }
        }

        // take the first n elements of the list and return a new list with them
        pub fn take(&mut self, n: usize) -> List<T> {
            if n == 0 {
                return List::new();
            }

            let mut new_list = List::new();

            for _ in 0..n {
                if let Some(val) = self.pop() {
                    new_list.push(val);
                } else {
                    break;
                }
            }

            new_list
        }
    }

    pub struct ListIter<'a, T> {
        // implement the iterator trait for ListIter
        current: &'a Node<T>,
    }

    impl<'a, T: 'a> Iterator for ListIter<'a, T> {
        type Item = &'a T;

        fn next(&mut self) -> Option<Self::Item> {
            match self.current {
                Node::Nil => None,
                Node::Cons(val, next) => {
                    self.current = next;
                    Some(val)
                }
            }
        }
    }

    // something that may be useful for the iterator implementation:
    // let a = Some(T);
    // let b = &a;
    // match b { Some(i) => ... } // here i is a reference to T
}

pub mod List2 {

    #[derive(Debug)]
    pub struct Node<T> {
        elem: T,
        next: NodeLink<T>,
    }

    type NodeLink<T> = Option<Box<Node<T>>>;

    #[derive(Debug)]
    pub struct List<T> {
        head: NodeLink<T>,
    }

    // for this implementattion, since we are using option, take a look at the take method in Option<T>.
    // It allows to move the value of the option into another option and replace it with None
    // let mut a = Some(5);
    // let b = a.take(); // a is now None and b is Some(5)
    impl<T: std::fmt::Debug> List<T> {
        // same methods as List1

        pub fn new() -> Self {
            Self { head: None }
        }

        // insert a new element at the beginning of the list
        pub fn push(&mut self, elem: T) {
            let old_head = self.head.take();
            self.head = Some(Box::new(Node {
                elem,
                next: old_head,
            }));
        }

        // pop the first element of the list and return it
        fn pop(&mut self) -> Option<T> {
            match self.head.take() {
                None => None,
                Some(node) => {
                    self.head = node.next;
                    Some(node.elem)
                }
            }
        }

        // return a referece to the first element of the list
        pub fn peek(&self) -> Option<&T> {
            match self.head.as_ref() {
                None => None,
                Some(node) => Some(&node.elem),
            }
        }

        // uncomment after having implemented the ListIter struct
        // return an interator over the list values
        //fn iter(&self) -> ListIter<T> {
        //    unimplemented!()
        //}

        // take the first n elements of the list and return a new list with them
        pub fn take(&mut self, n: usize) -> List<T> {
            let mut new_list = List::new();
            if n == 0 {
                return new_list;
            }

            for _ in 0..n {
                if let Some(val) = self.pop() {
                    new_list.push(val);
                } else {
                    break;
                }
            }
            new_list
        }
    }
}

pub mod dlist {
    // *****
    // double linked list suggestions:
    // the node has both a next and a prev link

    use std::cell::RefCell;
    use std::rc::{Rc, Weak};

    type NodeLink<T> = Option<Rc<RefCell<DNode<T>>>>;
    type NodeBackLink<T> = Option<Weak<RefCell<DNode<T>>>>;

    #[derive(Debug)]
    struct DNode<T> {
        elem: T,
        prev: NodeBackLink<T>, // which type do we use here?
        next: NodeLink<T>,     // which type do we use here?
    }

    #[derive(Debug)]
    struct DList<T> {
        head: NodeLink<T>,
        tail: NodeLink<T>,
    }

    // use Rc, since we need more than one reference to the same node.
    // You need to both strong and weak references

    // For mutating the list and changing the next and prev fields we also need to be able to mutate the node,
    // therefore we can use RefCell too (as for the tree at lesson)

    // how to access content of Rc<RefCell<T>>:
    // es let a = Rc::new(RefCell::new(5));
    // let mut x = (*a).borrow_mut();  // with (*a) we dereference the Rc, with (*a).borrow_mut() we get a mutable reference to the content of the RefCell
    // *x = 6; // we can now change the content of the RefCell

    // hint for pop: you can return either a reference to the value or take the value out of the Rc,
    // but usually it is not possible to take out the value from an Rc since it may be referenced elsewhere.
    // if you can guarantee it's the only reference to the value  you can use Rc::try_unwrap(a).unwrap().into_inner() to get the value
    // it first takes out the value from the Rc, then it tries to unwrap the value from the Result, and finally it takes the inner value from the Result
    // see here
    // https://stackoverflow.com/questions/70404603/how-to-return-the-contents-of-an-rc
    // otherwise you can impose the COPY trait on T

    // other hint that may be useful: Option<T> has a default clone implementation which calls the clone of T. Therefore:
    // Some(T).clone() ->  Some(T.clone())
    // None.clone() -> None

    
}
