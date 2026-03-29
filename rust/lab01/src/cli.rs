use std::env;
// use std::io;

pub fn read_cli() -> (String, i32){
    let args: Vec<String> = env::args().collect();
    let len: usize = args.len();
    let mut file = "".to_string();
    let mut n: i32 = 10;

    if len >= 2{
        file = args[1].clone();
    }

    if len == 4{
        let head = &args[2];
        if *head == "--head".to_string() {
            match &args[3].parse(){
                Ok(parse_result) => {
                    if *parse_result >= 0 {
                        n = *parse_result;
                    }
                },
                Err(e) => println!("{e}")
            }
        }
    }
    (file.to_string(), n)
}