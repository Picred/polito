
extern int ASM_funct();

int main(void){
	
	volatile int r=0;

	r = ASM_funct();

	while(1);
}
