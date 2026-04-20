// table.rs
// Characters at position i in SUBS_I map to characters at position i in SUBS_O
// other characters like ñ are considered symbols ( transalted with -)

pub const SUBS_I : &str = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż";
pub const SUBS_O: &str  = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz";
