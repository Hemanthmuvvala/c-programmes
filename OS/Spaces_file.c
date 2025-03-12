#include <stdio.h>

int main(int argc, char *argv[]) {
    FILE *fp;
    char ch;
    int sc = 0;  // Space counter

    // Check if filename is provided
    if (argc != 2) {
        printf("Usage: %s <filename>\n", argv[0]);
        return 1;
    }

    // Open file for reading
    fp = fopen(argv[1], "r");
    if (fp == NULL) {  // Fix incorrect assignment (fp = NULL)
        printf("Unable to open the file: %s\n", argv[1]);
        return 1;
    }

    // Read file character by character
    while ((ch = fgetc(fp)) != EOF) {
        if (ch == ' ') {  // Fix incorrect quotes in the condition
            sc++;  // Fix variable name (SC → sc)
        }
    }

    printf("Number of spaces: %d\n", sc);

    fclose(fp);  // Close the file

    return 0;
}
