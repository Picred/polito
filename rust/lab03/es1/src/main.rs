mod table;

use table::SUBS_I;
use table::SUBS_O;

fn conv ( c : char ) -> char {
    // se [a-z] [0-9] return c
    if c.is_ascii_alphabetic(){
        // println!("è alphacoso: {:?}", c);
        return c;
    }

    // se accentata, rimuove accento (se presente in tabella) e fa return
    if let Some(idx) = SUBS_I.chars().position(|el| el == c){
        return SUBS_O.chars().nth(idx).unwrap_or(c);
    }
    
    // println!("torno '-' {:?}", c);

    '-'
}


fn slugify(s: &str) -> String {
    if s.is_empty() { return "".to_string(); }

    let mut result = String::new();
    let mut last_was_dash = false;

    for c in s.chars() {
        let lowered = c.to_ascii_lowercase();
        let converted = conv(lowered);

        if converted == '-' {
            if !last_was_dash {
                result.push('-');
                last_was_dash = true;
            }
        } else {
            result.push(converted);
            last_was_dash = false;
        }
    }

    // Rimuovi il trattino finale se presente e se la stringa non è solo "-"
    if result.len() > 1 && result.ends_with('-') {
        result.pop();
    }

    // Se il risultato finale è vuoto o non convertibile (es. solo caratteri invalidi)
    // i tuoi test si aspettano "Cannot convert" in certi casi
    if result.is_empty() {
        return "Cannot convert".to_string();
    }

    result
}

fn is_slug(to_test: &str) -> bool{
    if to_test.is_empty(){
        return false;
    }
    let result = slugify(to_test);

    if result != "Cannot convert".to_string(){
        return false;
    }
    true
}

// trait MySlug{
//     fn is_slug(&self) -> bool;
//     fn to_slug(&self) -> String;
// }


// impl MySlug for String{
//     fn is_slug(&self) -> bool {
//         is_slug(self)
//     }

//     fn to_slug(&self) -> String{
//         slugify(&self)
//     }

// }
// impl MySlug for &str{
//     fn is_slug(&self) -> bool {
//         is_slug(&self)
//     }

//     fn to_slug(&self) -> String{
//         slugify(&self)
//     }
// }


trait MySlug{
    fn is_slug(&self) -> bool;
    fn to_slug(&self) -> String;
}


impl<T> MySlug for T 
    where T: AsRef<str>{
    
    fn is_slug(&self) -> bool {
        is_slug(&self.as_ref())
    }

    fn to_slug(&self) -> String{
        slugify(&self.as_ref())
    }
}

fn main() {
    let s1 = String::from ("Hello String") ;
    let s2 = "hello-slice ";

    println!("{}", s1.is_slug()); // false
    println!("{}", s2.is_slug()); // true

    let s3 : String = s1.to_slug ();
    let s4 : String = s2.to_slug ();
    println!("s3:{} s4:{} ",s3 ,s4 ); // s3:hello-string s4:hello-slice
}
