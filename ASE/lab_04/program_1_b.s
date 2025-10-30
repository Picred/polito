# program_1_b.s
# Graduate loop unrolling of program_1.s

.section .data
i: .float 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
w: .float 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6

b: .word 0xab

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
    la x1, i
    la x2, w
    la x3, b
    flw f3, 0(x3)
    flw f4, 0(x4)


    la x4, subsum
    la x5, x
    la x6, y

    la x7, mask
    lw x8, 0(x7) 


    li x11, 15

loop_sum:
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10

    # ----------------
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10
    # ---------------------

    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10

    # ----------------
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10
    # ---------------------

    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10

    # ----------------
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10
    # ---------------------

    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10

    # ----------------
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10
    # ---------------------

    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10

    # ----------------
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10
    # ---------------------

    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10

    # ----------------
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10
    # ---------------------

    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10

    # ----------------
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10
    # ---------------------

    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10

    # ----------------
    flw f1, 0(x1) # elemento di i
    flw f2, 0(x2) # elemento di w
    addi x11, x11, -1

    fmul.s f10, f1, f2 # i * w

    addi x1, x1, 4 # avanzo indice i
    addi x2, x2, 4 # avanzo indice w

    fadd.s f4, f4, f10
    # ---------------------
    bgez x11, loop_sum


add_bias:
    fadd.s f4, f4, f3 # f4+= b


compute_y:
    fmv.x.w x12, f4
    slli x12, x12, 1
    srli x12, x12, 24

	bne x12, x8, done_y

set_y_zero:
	li x9, 0
    fmv.s.x f4, x9

done_y:
	fsw f4, 0(x6)


end:
    li a0, 0
    li a7, 93
    ecall
