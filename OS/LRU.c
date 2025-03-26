#include <stdio.h>

int main() {
    int i, j, min, rs[25], m[10], count[10], flag[25], n, f, pf = 0, next = 1;

    printf("Enter the length of reference string: ");
    scanf("%d", &n);

    printf("Enter the reference string: ");
    for (i = 0; i < n; i++) {
        scanf("%d", &rs[i]);
        flag[i] = 0;
    }

    printf("Enter the number of frames: ");
    scanf("%d", &f);

    for (i = 0; i < f; i++) {
        count[i] = 0;
        m[i] = -1;
    }

    printf("\nThe Page Replacement process is:\n");

    for (i = 0; i < n; i++) {
        int found = 0;

        // Check if the page is already in memory
        for (j = 0; j < f; j++) {
            if (m[j] == rs[i]) {
                flag[i] = 1;
                count[j] = next;
                next++;
                found = 1;
                break;
            }
        }

        // Page fault occurs
        if (!found) {
            if (i < f) { // Initial filling of frames
                m[i] = rs[i];
                count[i] = next;
                next++;
            } else { // Replace LRU page
                min = 0;
                for (j = 1; j < f; j++) {
                    if (count[min] > count[j])
                        min = j;
                }
                m[min] = rs[i];
                count[min] = next;
                next++;
            }
            pf++; // Increment page fault count
        }

        // Print the frame contents
        for (j = 0; j < f; j++) {
            if (m[j] != -1)
                printf("%d\t", m[j]);
            else
                printf("-\t"); // Print empty frame as "-"
        }

        if (!found)
            printf("PF No. -- %d", pf);
        
        printf("\n");
    }

    printf("\nTotal number of page faults using LRU: %d\n", pf);

    return 0;
}
