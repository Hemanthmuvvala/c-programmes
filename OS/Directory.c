#include<stdio.h>
#include<dirent.h>
#include<stdlib.h>

int main(int argc, char *argv[])
{
    char buff[100];
    DIR *dirp;
    struct dirent *dptr;

    printf("Enter the directory name: ");
    scanf("%s", buff);

    if((dirp = opendir(buff)) == NULL)
    {
        printf("The directory does not exist\n");
        exit(1);
    }

    while((dptr = readdir(dirp)) != NULL)
    {
        printf("%s\n", dptr->d_name);
    }

    closedir(dirp);
    return 0;
}
