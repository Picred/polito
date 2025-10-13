.section .data
v1: .byte 2, 6, -3, 11, 9, 18, -13, 16, 5, 1
v2: .byte 4, 2, -13, 3, 9, 9, 7, 16, 4, 7
v3: .space 10

flag1: .byte 1
flag2: .byte 1
flag3: .byte 1


# Code section
.section .text

.globl _start 
_start:
    la x1, v1
    lb x2, 0(x1)

    la x1, v2
    lb x2, 0(x1)

    la x1, v3
    lb x2, 0(x1)

    la x7, flag1
    la x8, flag2
    la x9, flag3


Main:
    la x1, v1 # indice per v1
    la x3, v3 # indice per v3

    la x21, flag1
    la x22, flag2
    la x23, flag3

    li x11, 10 # dimensione vettore v1
    li x13, 0 # dimensione vettore v3


v1_loop:
    beqz x11, flags # v1 scorso
    lb x5, 0(x1) # elemento di v1 = x1[0]

    la x2, v2 # indice per v2
    li x12, 10 # dimensione vettore v2

    
v2_loop:
    beqz x12, next_v1
    lb x6, 0(x2) # elemento di v2 = x2[0]

    beq x5, x6, add_on_v3

    addi x2, x2, 1 # avanzo l'indice di v2
    addi x12, x12, -1 # decremento la dimensione di v2
    j v2_loop


add_on_v3:
    sb x5, 0(x3)
    # lb x15, 0(x3) # test per visualizzare v3
    addi x3, x3, 1
    addi x13, x13, 1

    j next_v1

next_v1:
    addi x1, x1, 1 # avanzo l'indice di v1
    addi x11, x11, -1 # decremento la dimensione di v1
    bnez x11, v1_loop



flags: # dim v3 in x13 
    lbu x7, 0(x21) # flag1 dimensione, assumo vuoto
    lbu x8, 0(x22) # flag2 crescente (assunto)
    lbu x9, 0(x23) # flag3 decrescente (assunto)


    # dim v3 = x13 != 0, flag1 = x7 lo metto a 0
    seqz x7, x13 # controllo flag1
    sb x7, 0(x21) # store flag1

    beqz x13, zero_one_element

    # caso v3 ha un solo elemento, assumo che non sia nè crescente nè decrescente
    li x11, 1  # registro temporaneo casuale
    beq x13, x11, zero_one_element

    # qui sono sicuro che ci sono almeno due elementi in v3
    # controllo flag2 e flag3, flag1 gia fatto
    la x3, v3
    addi x13, x13, -1  # numero di coppie da confrontare


check_order:
    lb x1, 0(x3) # prev
    lb x2, 1(x3) # next

    blt x1, x2, not_decrescente # x1 < x2
    bgt x1, x2, not_crescente # x1 > x2

next_pair:
    addi x3, x3, 1
    addi x13, x13, -1
    bnez x13, check_order
    j End

not_crescente:
    mv x8, x0 # flag2
    la x22, flag2
    sb x8, 0(x22) # store flag2
    j next_pair

not_decrescente:
    mv x9, x0 # flag3

    sb x9, 0(x23) # store flag23

    j next_pair


zero_one_element:
    # setto flag2/3 a 0 assumendo che un elemento in v3 non è nè crescente nè decrescente
    mv x8, x0 # flag2
    mv x9, x0 # flag3

    sb x8, 0(x22) # store flag2
    sb x9, 0(x23) # store flag23
    j End



End:
    # exit() syscall. This is needed to end the simulation
    # gracefully
    li a0, 0
    li a7, 93
    ecall
