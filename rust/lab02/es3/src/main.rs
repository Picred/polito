use std::default;
use std::fs::read_to_string;
use std::fs::write;

use std::ops::Mul;
use std::time::SystemTime;
use std::fmt;

enum MyError { 
    Simple(SystemTime), 
    Complex(SystemTime, String),
}


#[derive(Debug)]
pub enum MulErr { 
    Overflow, 
    NegativeNumber 
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self{
            MyError::Simple(content) => write!(f, "({:?})", content),
            MyError::Complex(content, content2) => write!(f, "({:?}, {:?})", content, content2)
        }
    }
}

fn print_error(e: MyError){
    println!("{}", e);
}


pub fn mul(a: i32, b: i32) -> Result<u32, MulErr> { 
    if a < 0 || b < 0{
        return Err(MulErr::NegativeNumber);
    }
    else if a.overflowing_mul(b).1 {
        return Err(MulErr::Overflow);
    }

    return Ok(a.mul(b) as u32);
}


fn read_file (filename: &str){
    if let Ok(read_file) = read_to_string(filename){
        // println!("readed: {:?}", readed_file);
        let mut to_write = String::new();
        for _ in 0..10{
            to_write.push_str(read_file.as_str());
        }
        
        if let Err(e) = write(filename, to_write){
            eprintln!("write() error: {}", e);
        }
    }
}

fn main() {
    // read_file("test.txt");

    // let err = MyError::Simple(SystemTime::now());
    // print_error(err);

    match mul(99999, 99999){
        Ok(res) => println!("{res}"),
        Err(err) => println!("{:?}", err)
    }

}




#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;

    #[test]
    fn test_mul_success() {
        assert_eq!(mul(10, 5).unwrap(), 50);
    }

    #[test]
    fn test_mul_negative() {
        match mul(-1, 5) {
            Err(MulErr::NegativeNumber) => assert!(true),
            _ => panic!("Doveva restituire NegativeNumber"),
        }
    }

    #[test]
    fn test_mul_overflow() {
        match mul(i32::MAX, 2) {
            Err(MulErr::Overflow) => assert!(true),
            _ => panic!("Doveva restituire Overflow"),
        }
    }

    #[test]
    fn test_read_file_logic() {
        let filename = "test_test.txt";
        let content = "Rust";
        
        fs::write(filename, content).expect("Impossibile creare file di test");

        read_file(filename);

        let new_content = fs::read_to_string(filename).expect("Impossibile leggere file modificato");
        
        assert_eq!(new_content, content.repeat(10));

        fs::remove_file(filename).ok();
    }

    #[test]
    fn test_read_file_non_existent() {
        read_file("file_fantasma_123.txt"); 
        assert!(true);
    }

    #[test]
    fn test_my_error_display() {
        let now = SystemTime::now();
        let err = MyError::Simple(now);
        
        let output = format!("{}", err);
        assert!(output.contains(&format!("{:?}", now)));
    }
}