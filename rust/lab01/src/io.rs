use std::fs::File;
use std::io::{BufRead, BufReader};


pub fn read_file(args: (String, i32)){
    let file = File::open(args.0);
    let mut lines_number = 0;
    let head = args.1;
    
    match file{
        Ok(file_res) => {
            let reader = BufReader::new(file_res);
            
            for line_res in reader.lines(){
                match line_res{
                    Ok(line) => {
                        lines_number += 1;
                        println!("{}", line);

                        if lines_number > head{
                            break;
                        }
                    },
                    Err(e) => println!("{e}")
                }
            }
            println!("rows: {}\nhead ({})\n", lines_number, head);
        },
        Err(e) => println!("{}\nUsage: cargo run -- filename.csv [--head <N>]", e)
    }
}