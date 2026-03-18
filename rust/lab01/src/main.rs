mod io;
mod cli;

use cli::read_cli;
use io::read_file;

fn main() {
    read_file(read_cli());
}