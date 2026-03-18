use std::fs::File;
use std::io::{BufRead, BufReader};



pub fn read_file(args: (String, i32)){
    let file = File::open(args.0.to_string());
    let mut line_numbers = 0;
    match file{
        Ok(file_res) => {
            let reader = BufReader::new(file_res);
            
            for line in reader.lines(){
                match line{
                    Ok(_) => line_numbers += 1 ,
                    Err(e) => println!("{e}")
                }
            }

        },
        Err(e) => println!("{}\nUsage: cargo run -- filename.csv --head <N>", e)
    }

    // println!("Filename: {}, n: {}", args.0, args.1);
    println!("{line_numbers} lines counted");

}