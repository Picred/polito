				
				
				AREA asm_functions, CODE, READONLY				
                EXPORT  ASM_funct
ASM_funct
				; save current SP for a faster access 
				; to parameters in the stack
				;MOV   r12, sp
				; save volatile registers
				PUSH{LR}
				;STMFD sp!,{r4-r8,r10-r11,lr}				
				

				; your code
				SVC		0xA
				
				; R0 ha il risultato
				
				POP {PC}
				
                END