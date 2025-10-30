# program_1_a.s
# rescheduling of program_1.s

.section .data
i: .float 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
w: .float 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6

b: .word 0xab # da convertire in (float)

x: .space 4
y: .space 4

mask: .word 0xFF

subsum: .float 0.0

# Code section
.section .text
.globl _start


_start:
    la x1, i
    flw f1, 0(x1)

    la x2, w
    flw f2, 0(x2)

    la x3, b
    lw x13, 0(x3)

    la x4, subsum
    flw f3, 0(x4)

    la x5, x
    la x6, y
    la x7, mask


main:
    la x1, i # indirizzo i
    la x2, w # indirizzo w
    la x3, b # indirizzo b
    flw f3, 0(x3) # valore di bias (b) float
    flw f4, 0(x4) # valore subsum, inizialmente 0


    la x4, subsum # indirizzo subsum
    la x5, x # indirizzo x
    la x6, y # indirizzo y

    la x7, mask # indirizzo mask
    lw x8, 0(x7) # valore mask


    li x11, 15 # K = dimensione vettori


loop_sum:
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1 # K-- # sposto qui per evitare uno stallo

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10 # sposto sotto in attesa della fmul.s
    bgez x11, loop_sum


add_bias:
    fadd.s f4, f4, f3 # f4+= b


compute_y:
    fmv.x.w x12, f4 # sposto i bit fp dell'accumulatore f4 in un intero per fare shift
    slli x12, x12, 1 # shift a sx. tolgo il segno.
    srli x12, x12, 24 # shift a dx togliendo la mantissa di 23+1 bits

	bne x12, x8, done_y

set_y_zero:
	li x9, 0
    fmv.s.x f4, x9 # metto 0 in f4

done_y:
	fsw f4, 0(x6)


end:
    li a0, 0
    li a7, 93
    ecall
