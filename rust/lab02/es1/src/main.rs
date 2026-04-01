mod table;

use std::fs::File;

use table::SUBS_I;
use table::SUBS_O;
use std::io::BufRead;


fn stats(text: &str) -> [u32; 26] {
    let mut counts = [0u32; 26];

    for mut c in text.chars() {
        c = c.to_ascii_lowercase();
        
        if let Some(idx) = SUBS_I.find(c) {
            c = SUBS_O.chars().nth(idx).unwrap();
        }

        if c >= 'a' && c <= 'z' {
            counts[(c as usize) - ('a' as usize)] += 1;
        }
    }
    counts
}

fn is_pangram(counts: &[u32]) -> bool {
    if counts.len() < 26{
        return false;    
    }
    counts.iter().all(|&el| el > 0)
}




// call this function from main
// load here the contents of the file
pub fn run_pangram() {
    let args: Vec<String> = std::env::args().collect();

    if args.len() < 2 {
        println!("USAGE: cargo run -- file.txt");
        std::process::exit(0);
    }

    let filename= &args[1];
    let file = File::open(filename).expect("File::open()");
    let reader = std::io::BufReader::new(file);
    
    let mut counts = [0u32; 26];
    for line in reader.lines(){
        if let Ok(text) = line {
            for mut c in text.chars(){
                c = c.to_ascii_lowercase();

                if let Some(idx) = SUBS_I.find(c){
                    c = SUBS_O.chars().nth(idx).unwrap_or(c);
                }

                if c.is_ascii_alphabetic(){
                    let index = (c as usize) - ('a' as usize);
                    if index < 26{
                        counts[index] += 1;
                    }
                }
            }

        } 
    }

    if is_pangram(&counts){
        println!("{:?} is pangram", filename);
    } else{
        println!("{:?} is NOT pangram", filename);
    }

}


// please note, code has been splitted in simple functions in order to make testing easier

#[cfg(test)] // this is a test module
mod tests{   
    // tests are separated modules, yuou must import the code you are testing
    use super::*;
    
    #[test]
    fn test_all_ones() {
        let counts = [1; 26];
        assert!(is_pangram(&counts));
    }

    #[test]
    fn test_some_zeros() {
        let mut counts = [0; 26];
        counts[0] = 1;
        counts[1] = 1;
        assert!(!is_pangram(&counts));
    }
    
    #[test]
    fn test_increasing_counts() {
        let mut counts = [0; 26];
        for i in 0..26 {
            counts[i] = i as u32 + 1;
        }
        assert!(is_pangram(&counts));
    }

    #[test]
    fn test_wrong_size()  {
        let counts = [1; 25];
        assert!(!is_pangram(&counts));
    }    
    
    #[test]
    fn test_stats_on_full_alphabet() {
        let counts = stats("abcdefghijklmnopqrstuvwxyz");
        for c in counts {
            assert!(c == 1);
        }
    }

    #[test]
    fn test_stats_on_empty_string() {
        let counts = stats("");
        for c in counts {
            assert!(c == 0);
        }
    }

    #[test]
    fn test_stats_missing_char() {
        let counts = stats("abcdefghijklmnopqrstuvwxy");
        for c in counts.iter().take(25) {
            assert!(*c == 1);
        }
        assert!(counts[25] == 0);

    }

    #[test]
    fn test_stats_on_full_tring() {
        let contents = "The quick brown fox jumps over the lazy dog";
        let counts = stats(contents);
        for c in counts {
            assert!(c > 0);
        }
    }

    #[test]
    fn test_stats_with_punctuation() {
        let contents = "The quick brown fox jumps over the lazy dog!";
        let counts = stats(contents);
        for c in counts {
            assert!(c > 0);
        }
    }

    #[test] 
    fn test_missing_char_on_full_string() {
        let contents = "The quick brown fox jumps over the laz* dog";
        let counts = stats(contents);
        println!("{:?}", counts);
        for (i, c) in counts.iter().enumerate() {
            if i == 24 {
                assert!(*c == 0);
            } else {
                assert!(*c > 0);
            }
            
        }
    }

    #[test]
    fn test_is_pangram() {
        let counts = stats("The quick brown fox jumps over the lazy dog");
        assert!(is_pangram(&counts));
    }
}

fn main() {
    run_pangram();
}

