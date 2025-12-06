#include <math.h>

extern int fast_magic_calc(int);

extern unsigned int _Input_Values;
extern unsigned char _NUM_VALUES;


int main(void){
		volatile float ERRORS[8];
		volatile unsigned int * vector = (unsigned int *)&_Input_Values;    
    volatile unsigned char numbers = _NUM_VALUES;
    volatile int i;

    for(i = 0; i < numbers; i++){
        float x = *((float *)&vector[i]);

        int input_int = vector[i];
        int initial_guess_int = fast_magic_calc(input_int);

        // Cast
        float y = *((float *)&initial_guess_int);
        float x2 = x * 0.5f;
        y = y * (1.5f - (x2 * y * y));
        
        float fast_result = y;
        
        // Standard sqrt
        
        float standard_result = 1.0f / sqrtf(x);
        
        // calcolo errore
        float error = fabsf(fast_result - standard_result);
        ERRORS[i] = error;
    }

    while(1);
}
