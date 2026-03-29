mod io;
mod cli;

use cli::read_cli;
use io::read_file;

fn main() {
    // cargo run -- file.csv [--head <n>]
    read_file(read_cli());
}