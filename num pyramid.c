//you can print stars instead of numbers if u want.
#include <stdio.h>

int main() {
    int rows, i, j, space;

    printf("Enter the number of rows: ");
    scanf("%d", &rows);

    for (i = 1; i <= rows; ++i) {
        // Print spaces
        for (space = 1; space <= rows - i; ++space)
            printf("  ");

        // Print ascending numbers
        for (j = 1; j <= i; ++j)
            printf("%d ", j);

        // Print descending numbers
        for (j = i - 1; j >= 1; --j)
            printf("%d ", j);

        // Move to the next line after each row
        printf("\n");
    }

    return 0;
}
