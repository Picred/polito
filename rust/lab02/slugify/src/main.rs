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




fn main() {
    let args: Vec<String> = std::env::args().collect();

    if args.len() < 2{
        println!("USAGE: cargo run -- \"Slug sentence      here\"");
        return;
    }
    let slug_sentence = &args[1];

    println!("slug: {}", slugify(slug_sentence));
}


#[cfg(test)]
mod tests {
    use super ::*;
    
    #[test]
    fn test_conv_accented () {
        assert_eq !( conv('è') , 'e' );
    }


    #[test]
    fn test_conv_plain () {
        assert_eq !( conv('e') , 'e' );
    }


    #[test]
    fn test_conv_invalid () {
        assert_eq !( conv('!') , '-' );
    }


    #[test]
    fn test_conv_unknown_accent () {
        assert_eq !( conv('ŵ') , '-' );
    }


    #[test]
    fn test_slug_multiword () {
        assert_eq !( slugify("tèst spac+d") , "test-spac-d" );
    }


    #[test]
    fn test_slug_accented () {
        assert_eq !( slugify("èàùòùàè") , "eauouae" );
    }


    #[test]
    fn test_slug_empty () {
        assert_eq !( slugify("") , "" );
    }


    #[test]
    fn test_slug_consecutive_spaces () {
        assert_eq !( slugify("tèst   tòst") , "test-tost" );
    }


    #[test]
    fn test_slug_consecutive_invalid () {
        assert_eq !( slugify("^^^") , "-" );
    }

    
    #[test]
    fn test_slug_only_invalid () {
        assert_eq !( slugify(" ") , "-" );
    }


    #[test]
    fn test_slug_trailing_space () {
        assert_eq !( slugify("àèìòù ") , "aeiou" );
    }


    #[test]
    fn test_slug_trailing_invalid () {
        assert_eq !( slugify("àèìòù    ") , "aeiou" );
    }
}