pub mod solution{
    use std::fmt::{Display, Formatter, Error};
    use std::ops::{Add, AddAssign};
    use std::convert::{From, TryFrom, AsRef, AsMut};
    use std::cmp::{PartialEq, Ord, PartialOrd, Ordering, Eq};

    #[derive(Debug, Clone, Copy, Default)]
    pub struct ComplexNumber{
        real: f64,
        imag: f64,
    }


    #[derive(Debug, PartialEq)]
    pub enum ComplexNumberError{
        ImaginaryNotZero
    }

    impl ComplexNumber{
        pub fn new(r: f64, i: f64) -> Self { Self{ real: r, imag: i} }
        pub fn real(&self) -> f64 { self.real }
        pub fn imag(&self) -> f64 { self.imag }
        pub fn from_real(r: f64) -> Self { Self{ real: r, imag: 0.0 } }
        pub fn to_tuple(&self) -> (f64, f64) { ( self.real, self.imag ) }
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

    impl Add<f64> for ComplexNumber{
        type Output = Self;
        fn add(self, other: f64) -> Self::Output{
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

    // // commented out again when implementing TryInto because it's covered by TryInto see note below
    // impl From<ComplexNumber> for f64{
    //     fn from(from: ComplexNumber) -> Self{
    //         if from.imag == 0.0{
    //             from.real as f64
    //         }
    //         else{
    //             panic!("imag is not 0. Cannot convert");
    //         }
    //     }
    // }

    impl TryFrom<ComplexNumber> for f64{
        type Error = ComplexNumberError;
        fn try_from(value: ComplexNumber) -> Result<Self, Self::Error> {
            if value.imag == 0.0{
                Ok( value.real )
            } else{
                Err(ComplexNumberError::ImaginaryNotZero)
            }
        }
    }

    impl From<f64> for ComplexNumber{
        fn from(value: f64) -> Self {
            ComplexNumber { real: value, imag: 0.0 }
        }
    }

    impl PartialEq<Self> for ComplexNumber{
        fn eq(&self, other: &Self) -> bool {
            self.real == other.real && self.imag == other.imag
        }
    }

    impl Ord for ComplexNumber{
        fn cmp(&self, other: &Self) -> Ordering{
            if self.real > other.real && self.imag > other.imag{
                Ordering::Greater
            } else if self.real < other.real && self.imag < other.imag{
                Ordering::Less
            } else{
                Ordering::Equal
            }
        }
    }

    impl PartialOrd<Self> for ComplexNumber{
        fn partial_cmp(&self, other: &Self) -> Option<Ordering>{
            Some(self.cmp(other))
        }
    }

    impl Eq for ComplexNumber {}

    impl AsRef<f64> for ComplexNumber{
        fn as_ref(&self) -> &f64{
            &self.real
        }
    }

    impl AsMut<f64> for ComplexNumber{
        fn as_mut(&mut self) -> &mut f64{
            &mut self.real
        }
    }

}