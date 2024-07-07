#include <stdio.h>
#include <string.h>

// Function to handle user input and generate responses
void chat() {
    char input[100];
    
    printf("Hi, I'm ChatBot! How can I assist you today?\n");
    while (1) {
        printf("You: ");
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = '\0';  // Remove newline character
        
        // Simple pattern matching and responses
        if (strstr(input, "hello") || strstr(input, "hi")) {
            printf("ChatBot: Hello there!\n");
        } else if (strstr(input, "how are you")) {
            printf("ChatBot: I'm a program, so I'm always ready to help!\n");
        } else if (strstr(input, "bye")) {
            printf("ChatBot: Goodbye! Have a great day!\n");
            break;
        } else {
            printf("ChatBot: Sorry, I didn't understand that.\n");
        }
    }
}

int main() {
    chat();
    return 0;
}
