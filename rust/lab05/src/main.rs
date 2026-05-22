mod es0501;
use es0501::*;

fn main() {
    let mut l1 = List1::List::<i32>::new();
    l1.push(10);
    l1.push(40);
    l1.push(520);
    l1.push(4);

    let mut l2 = List2::List::<i32>::new();
    l2.push(68);

    // mem_inspect::dump_object(&l1);
    // mem_inspect::dump_object(&l2);

    for node in l1.iter(){
        println!("{:?}", node);
    }
}
