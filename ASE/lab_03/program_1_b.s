# program_1_b.s
# Unrolling di program_1_a.s

.section .data
v1: .float 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19, 1.20, 1.21, 1.22, 1.23, 1.24, 1.25, 1.26, 1.27, 1.28, 1.29, 1.30, 1.31, 1.32
v2: .float 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15, 2.16, 2.17, 2.18, 2.19, 2.20, 2.21, 2.22, 2.23, 2.24, 2.25, 2.26, 2.27, 2.28, 2.29, 2.30, 2.31, 2.32
v3: .float 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12, 3.13, 3.14, 3.15, 3.16, 3.17, 3.18, 3.19, 3.20, 3.21, 3.22, 3.23, 3.24, 3.25, 3.26, 3.27, 3.28, 3.29, 3.30, 3.31, 3.32

v4: .space 128
v5: .space 128
v6: .space 128

m: .word 1
a: .space 8
b: .float 0.0


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

    la x1, m
    lw x2, 0(x1)

    la x1, a
    lw x2, 0(x1)

    la x1, b
    lw x2, 0(x1)

main:
    la x1, v1        # indice per v1
    la x2, v2        # indice per v2
    la x3, v3        # indice per v3

    la x4, v4        # indice per v4
    la x5, v5        # indice per v5
    la x6, v6        # indice per v6

    la x7, m         # indirizzo m
    la x8, a         # indirizzo a
    la x9, b         # indirizzo b

    li x11, 31       # dimensione vettori (indice iniziale)
    li x12, 3        # valore da confrontare per operazione modulo

    # offset per farli partire dalla fine (124 = 31*4)
    addi x1, x1, 124
    addi x2, x2, 124
    addi x3, x3, 124
    addi x4, x4, 124
    addi x5, x5, 124
    addi x6, x6, 124

loop:
    # ELEMENTO 0 (i)
    flw f21, 0(x1)        # elemento di v1 = v1[i]
    lw  x21, 0(x7)        # carica m
    rem x13, x11, x12     # x13 = i % 3
    bnez x13, else0

if0:
    sll x22, x21, x11     # x22 = m << i
    fcvt.s.w f4, x22      # f4 = float(x22)
    fdiv.s f1, f21, f4    # f1 = v1[i] / f4
    li   x23, 1
    fcvt.w.s x21, f1      # x21 = int(f1)
    fsw f1, 0(x8)         # a = f1
    blt  x21, x23, fix_m0
    j    done_m0
fix_m0:
    mv   x21, x23
done_m0:
    mv   x20, x21
    sw   x21, 0(x7)
    j endif0

else0:
    fcvt.s.w f4, x21
    fcvt.s.w f7, x11
    fmul.s f6, f4, f7
    fmul.s f1, f21, f6
    fsw f1, 0(x8)
    fcvt.w.s x21, f1
    sw x21, 0(x7)
endif0:
    flw f23, 0(x3)
    fmul.s f31, f21, f1
    flw f24, 0(x4)
    fdiv.s f30, f24, f23
    flw f2, 0(x9)

    addi x1, x1, -4
    addi x2, x2, -4
    addi x3, x3, -4
    flw f22, 0(x2)

    addi x11, x11, -1

    flw f25, 0(x5)
    fsub.s f29, f24, f21
    fsub.s f31, f31, f22
    fsub.s f30, f30, f2
    fmul.s f28, f29, f25

    fsw f31, 0(x4)
    addi x4, x4, -4
    fsw f30, 0(x5)
    addi x5, x5, -4
    fsw f28, 0(x6)
    addi x6, x6, -4



    # ELEMENTO 1 (i-1)
    flw f21, 0(x1)
    lw  x21, 0(x7)
    rem x13, x11, x12
    bnez x13, else1

if1:
    sll x22, x21, x11
    fcvt.s.w f4, x22
    fdiv.s f1, f21, f4
    li   x23, 1
    fcvt.w.s x21, f1
    fsw f1, 0(x8)
    blt  x21, x23, fix_m1
    j    done_m1
fix_m1:
    mv   x21, x23
done_m1:
    mv   x20, x21
    sw   x21, 0(x7)
    j endif1

else1:
    fcvt.s.w f4, x21
    fcvt.s.w f7, x11
    fmul.s f6, f4, f7
    fmul.s f1, f21, f6
    fsw f1, 0(x8)
    fcvt.w.s x21, f1
    sw x21, 0(x7)
endif1:
    flw f23, 0(x3)
    fmul.s f31, f21, f1
    flw f24, 0(x4)
    fdiv.s f30, f24, f23
    flw f2, 0(x9)

    addi x1, x1, -4
    addi x2, x2, -4
    addi x3, x3, -4
    flw f22, 0(x2)

    addi x11, x11, -1

    flw f25, 0(x5)
    fsub.s f29, f24, f21
    fsub.s f31, f31, f22
    fsub.s f30, f30, f2
    fmul.s f28, f29, f25

    fsw f31, 0(x4)
    addi x4, x4, -4
    fsw f30, 0(x5)
    addi x5, x5, -4
    fsw f28, 0(x6)
    addi x6, x6, -4



    # ELEMENTO 2 (i-2)
    flw f21, 0(x1)
    lw  x21, 0(x7)
    rem x13, x11, x12
    bnez x13, else2

if2:
    sll x22, x21, x11
    fcvt.s.w f4, x22
    fdiv.s f1, f21, f4
    li   x23, 1
    fcvt.w.s x21, f1
    fsw f1, 0(x8)
    blt  x21, x23, fix_m2
    j    done_m2
fix_m2:
    mv   x21, x23
done_m2:
    mv   x20, x21
    sw   x21, 0(x7)
    j endif2

else2:
    fcvt.s.w f4, x21
    fcvt.s.w f7, x11
    fmul.s f6, f4, f7
    fmul.s f1, f21, f6
    fsw f1, 0(x8)
    fcvt.w.s x21, f1
    sw x21, 0(x7)
endif2:
    flw f23, 0(x3)
    fmul.s f31, f21, f1
    flw f24, 0(x4)
    fdiv.s f30, f24, f23
    flw f2, 0(x9)

    addi x1, x1, -4
    addi x2, x2, -4
    addi x3, x3, -4
    flw f22, 0(x2)

    addi x11, x11, -1

    flw f25, 0(x5)
    fsub.s f29, f24, f21
    fsub.s f31, f31, f22
    fsub.s f30, f30, f2
    fmul.s f28, f29, f25

    fsw f31, 0(x4)
    addi x4, x4, -4
    fsw f30, 0(x5)
    addi x5, x5, -4
    fsw f28, 0(x6)
    addi x6, x6, -4



    # ELEMENTO 3 (i-3)
    flw f21, 0(x1)
    lw  x21, 0(x7)
    rem x13, x11, x12
    bnez x13, else3

if3:
    sll x22, x21, x11
    fcvt.s.w f4, x22
    fdiv.s f1, f21, f4
    li   x23, 1
    fcvt.w.s x21, f1
    fsw f1, 0(x8)
    blt  x21, x23, fix_m3
    j    done_m3
fix_m3:
    mv   x21, x23
done_m3:
    mv   x20, x21
    sw   x21, 0(x7)
    j endif3

else3:
    fcvt.s.w f4, x21
    fcvt.s.w f7, x11
    fmul.s f6, f4, f7
    fmul.s f1, f21, f6
    fsw f1, 0(x8)
    fcvt.w.s x21, f1
    sw x21, 0(x7)
endif3:
    flw f23, 0(x3)
    fmul.s f31, f21, f1
    flw f24, 0(x4)
    fdiv.s f30, f24, f23
    flw f2, 0(x9)

    addi x1, x1, -4
    addi x2, x2, -4
    addi x3, x3, -4
    flw f22, 0(x2)

    addi x11, x11, -1

    flw f25, 0(x5)
    fsub.s f29, f24, f21
    fsub.s f31, f31, f22
    fsub.s f30, f30, f2
    fmul.s f28, f29, f25

    fsw f31, 0(x4)
    addi x4, x4, -4
    fsw f30, 0(x5)
    addi x5, x5, -4
    fsw f28, 0(x6)
    addi x6, x6, -4

    # fine del gruppo di 4 elementi
    bltz x11, end
    j loop

end:
    li a0, 0
    li a7, 93
    ecall
