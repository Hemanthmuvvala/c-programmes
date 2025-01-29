#include <stdio.h>
#include <unistd.h>
int main() {
    pid_t pid;
    pid = fork();
    if (pid < 0) {
        printf("ERROR IN PROCESS CREATION\n");
        return 1;
    } else if (pid == 0) { // Child process
        printf("The child process ID is %d\n", getpid());
    } else { // Parent process
        printf("The parent process ID is %d\n", getpid());
    }
    return 0;
}
