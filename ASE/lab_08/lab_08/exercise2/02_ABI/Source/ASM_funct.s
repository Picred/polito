
				AREA my_function_ex3, CODE, READONLY
				EXPORT fast_magic_calc
fast_magic_calc
				PUSH {LR}
				; R0 contains the input_float_as_int (x)
				
				; 1. Load the magic constant 0x5f3759df into R1
				LDR R1, =0x5f3759df 
				LSR R0, R0, #1 
				
				SUBS R0, R1, R0 ; R0 = R1 - R0 (Magic - (x >> 1))
				
				POP {PC}
				BX LR
				
				END