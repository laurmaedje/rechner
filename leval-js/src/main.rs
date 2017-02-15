#![feature(link_args)]

extern crate leval;
use std::ffi::CStr;
use std::os::raw::c_char;

use std::f64;

#[link_args = "-s EXPORTED_FUNCTIONS=['_evaluate']"]
extern {}
fn main() {}

#[no_mangle]
pub extern fn evaluate(string: *const c_char) -> f64 {
    let rstr = unsafe { CStr::from_ptr(string).to_str().unwrap() };
    match leval::evaluate(rstr) {
        Ok(value) => value,
        Err(_) => f64::NAN,
    }
}