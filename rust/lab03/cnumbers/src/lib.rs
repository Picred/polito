// pub fn add(left: u64, right: u64) -> u64 {
//     left + right
// }


pub mod solution{
    use std::fmt::Display;
    use std::fmt::Formatter;
    use std::fmt::Error;
    use std::ops::Add;
    use std::ops::AddAssign;
    
    #[derive(Clone, Copy, Default)]
    pub struct ComplexNumber{
        real: f32,
        imag: f32,
    }


    pub struct ComplexNumberError{
    }

    impl ComplexNumber{
        pub fn new(r: f32, i: f32) -> Self { Self{real: r, imag: i} }
        pub fn real(&self) -> f32 { self.real }
        pub fn imag(&self) -> f32 { self.imag }
        pub fn from_real(r: f32) -> Self { Self{real: r, imag: 0.0} }
        pub fn to_tuple(&self) -> (f32, f32) { (self.real, self.imag) }
    }

    impl Display for ComplexNumber{
        fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error>{
            write!(f, "{} + {}i", self.real, self.imag)
        }
    }

    impl Add for ComplexNumber{
        type Output = Self;

        fn add(self, other: Self) -> Self::Output{
            Self { real: self.real + other.real, imag: self.imag + other.imag }
        }
    }

    impl Add<f32> for ComplexNumber{
        type Output = Self;
        fn add(self, other: f32) -> Self::Output{
            Self {real: self.real + other, imag: self.imag }
        }
    }

    impl AddAssign for ComplexNumber{
        fn add_assign(&mut self, rhs: Self){
            self.real += rhs.real;
            self.imag += rhs.imag;
        }
    }

    impl Add<&Self> for ComplexNumber{
        type Output = Self;
        fn add(self, other: &Self) -> Self::Output{
            Self {real: self.real + other.real, imag: self.imag + other.imag }
        }
    }

    impl<'a, 'b> Add<&'b ComplexNumber> for &'a ComplexNumber{
        type Output = ComplexNumber;

        fn add(self, other: &'b ComplexNumber) -> Self::Output{
            ComplexNumber {real: self.real + other.real, imag: self.imag + other.imag }
        }
    }

    

}

















#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
