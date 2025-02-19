#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main() {
    int pid, pidi, pid2;

    pid = fork();

    if (pid == -1) {  // Fixed the comparison operator
        printf("Error in process creation\n");
        exit(1);
    }

    if (pid != 0) {  // Parent process
        pidi = getpid();  // Assign correct variable
        printf("\nThe parent process ID is %d\n", pidi);
    } else {  // Child process
        pid2 = getpid();
        printf("\nThe child process ID is %d\n", pid2);
    }

    return 0;
}