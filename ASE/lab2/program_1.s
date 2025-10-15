.section .data
v1: .float 2, 6, -3, 11, 9, 18, -13, 16, 5, 1, 2, 6, -3, 11, 9, 18, -13, 16, 5, 1, 2, 6, -3, 11, 9, 18, -13, 16, 5, 1, 9, 12
v2: .float 4, 2, -13, 3, 9, 9, 7, 16, 4, 7, 4, 2, -13, 3, 9, 9, 7, 16, 4, 7, 4, 2, -13, 3, 9, 9, 7, 16, 4, 7, 9, 4
v3: .float 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32

v4: .space 128 # space alloca 1 byte
v5: .space 128 # 4 byte * 32 valori
v6: .space 128

# Code section
.section .text

.globl _start 

_start:
    la x1, v1
    flw f2, 0(x1)

    la x1, v2
    flw f2, 0(x1)

    la x1, v3
    flw f2, 0(x1)

    la x1, v4
    flw f2, 0(x1)

    la x1, v5
    flw f2, 0(x1)

    la x1, v6
    flw f2, 0(x1)


main:
    la x1, v1 # indice per v1
    la x2, v2 # indice per v2
    la x3, v3 # indice per v3

    la x4, v4 # indice per v4
    la x5, v5 # indice per v5
    la x6, v6 # indice per v6

    li x11, 31 # dimensione vettori
    li x12, 124 # offset 31*4

    # offset per farli partire dalla fine
    sub x1, x1, x12
    sub x2, x2, x12
    sub x3, x3, x12

    sub x4, x4, x12
    sub x5, x5, x12
    sub x6, x6, x12

loop:

    flw f21, 0(x1) # elemento di v1 = x1[]
    flw f22, 0(x2) # elemento di v2 = x2[]
    flw f23, 0(x3) # elemento di v3 = x3[]

    fmul.s f31, f21, f21 # f31 = v[i]*v[i]
    fsub.s f31, f31, f22 # f31 - v2[i]
    fsw f31, 0(x4)

    flw f24, 0(x4) # elemento di v4[i]
    fdiv.s f30, f24, f23 # f30 = v4[i] / v3[i]
    fsub.s f30, f30, f22 # f30 - v2[i]
    fsw f30, 0(x5)

    flw f25, 0(x5)
    fsub.s f29, f24, f21 # f29 = (v4[i] - v1[i])
    fmul.s f28, f29, f25 # f28 = f29 * v5[i]
    fsw f28, 0(x6)


    addi x1, x1, -4 # sposto indice v1
    addi x2, x2, -4 # sposto indice v2
    addi x3, x3, -4 # sposto indice v3

    addi x4, x4, -4 # sposto indice v4
    addi x5, x5, -4 # sposto indice v5
    addi x6, x6, -4 # sposto indice v6

    addi x11, x11, -1 # decremento i (dimensione vettore
    blt x11, x0, end # fine loop
    j loop


end:
    li a0, 0
    li a7, 93
    ecall