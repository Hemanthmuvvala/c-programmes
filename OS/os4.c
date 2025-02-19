#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX 1024

void usage() {
    printf("Usage:\t./a.out filename word\n");
}

int main(int argc, char *argv[]) {
    FILE *fp;
    char fline[MAX];
    char *newline;
    int count = 0;
    int occurrences = 0;

    if (argc != 3) {
        usage();
        exit(1);
    }

    fp = fopen(argv[1], "r");
    if (!fp) {
        printf("grep: could not open file: %s\n", argv[1]);
        exit(1);
    }

    while (fgets(fline, MAX, fp) != NULL) {
        count++;
        
        if ((newline = strchr(fline, '\n')) != NULL) {
            *newline = '\0';
        }

        if (strstr(fline, argv[2]) != NULL) {
            printf("%s: %d: %s\n", argv[1], count, fline);
            occurrences++;
        }
    }

    if (occurrences == 0) {
        printf("No occurrences of the word \"%s\" found.\n", argv[2]);
    }

    fclose(fp);
    return 0;
}