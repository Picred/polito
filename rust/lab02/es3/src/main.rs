use std::fs::File;
use std::fs::read_to_string;
use std::fs::write;

use std::io::Seek;
use std::io::Write;
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


fn read_write_file (filename: &str){
    if let Ok(read_file) = read_to_string(filename){
        let mut to_write = String::new();
        for _ in 0..10{
            to_write.push_str(read_file.as_str());
        }
        
        if let Err(e) = write(filename, to_write){
            eprintln!("write() error: {}", e);
        }
    }
}









const BSIZE: usize = 20;

pub struct Board { 
    boats: [u8; 4], 
    data: [[u8; BSIZE]; BSIZE],
}

pub enum Error { Overlap, OutOfBounds, BoatCount }

pub enum Boat { Vertical(usize), Horizontal(usize) }

impl Board {
    pub fn new(boats: &[u8]) -> Board {
        let boats_arr = [0u8; 4];
        // println!("{:?}", boats);

        if let Ok(mut board) = File::options().write(true).create(true).truncate(true).open("board.txt"){
            // let _ = board.write(boats);
            // let _ = board.write("\n".as_bytes());

            for el in boats{
                let _ = write(path, contents)
            }
            for _ in 0..BSIZE{
                for _ in 1..BSIZE{
                    let _ =board.write(" ".as_bytes());
                }
                let _ = board.write(" \n".as_bytes());
            }
        }
        
        Board{boats: boats_arr, data: [[b' '; BSIZE]; BSIZE] }
        
    }

    /// Crea una Board a partire dal contenuto del file (come stringa). 
    pub fn from(s: String) -> Board { todo!() }

    /// Aggiunge la nave; restituisce la nuova Board o un errore. 
    pub fn add_boat(self, boat: Boat, pos: (usize, usize)) -> Result<Board, Error> { todo!() }

    /// Converte la board in una stringa salvabile su file. 
    pub fn to_string(&self) -> String { todo!() }
}





fn add_ship_on_board(pos_x: u8, pos_y: u8){
    todo!()
}

fn main() {

    let args: Vec<String> = std::env::args().collect();

    if args.len() < 4{
        println!("USAGE: cargo run -- board.txt <new, add_boat> <args>");
        // return;   
    }

    let cmd = &args[2];
    
    match cmd.as_str(){
        "new" => { 
            let mut boats: Vec<u8> = vec![];
            for c in args[3].chars(){
                if c == ','{
                    continue;
                }
                else{
                    match c.to_digit(10){
                        Some(number) => { boats.push(number as u8);},
                        None => { return }
                    }
                }
            }
            Board::new(&boats);
        },
        "add_boat" => { },
        _ => println!("Unknown command")
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
    fn test_read_write_file() {
        let filename = "test_test.txt";
        let content = "Rust";
        
        fs::write(filename, content).expect("Impossibile creare file di test");

        read_write_file(filename);

        let new_content = fs::read_to_string(filename).expect("Impossibile leggere file modificato");
        
        assert_eq!(new_content, content.repeat(10));

        fs::remove_file(filename).ok();
    }

    #[test]
    fn test_read_write_file_non_existent() {
        read_write_file("file_fantasma_123.txt"); 
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