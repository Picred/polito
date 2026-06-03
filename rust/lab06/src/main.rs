use std::sync::Arc;
use std::sync::Mutex;
use std::thread;
use std::thread::JoinHandle;

pub fn is_prime(n: u64) -> bool {
    if n < 2 {
        return false;
    }
    for i in 2..=((n as f64).sqrt() as u64) {
        if n % i == 0 {
            return false;
        }
    }
    true
}

pub fn find_primes(limit: u64, n_threads: u64) -> Vec<u64> {
    let shared_counter = Arc::new(Mutex::new(2));
    let mut handles = vec![];

    for _ in 0..n_threads {
        let counter_clone = Arc::clone(&shared_counter);
        let limit_clone = limit.clone();

        let handle = thread::spawn(move || {
            let mut found_primes = vec![];

            let mut data = counter_clone.lock().unwrap();

            if (is_prime(*data)) {
                found_primes.push(*data);
                *data += 1;
            }

        });
        handles.push(handle);
    }

    for h in handles {
        let result = h.join().unwrap();
    }

    todo!();
}

pub fn main() {
    let prime_numbers_result = find_primes(1000, 10);
}
