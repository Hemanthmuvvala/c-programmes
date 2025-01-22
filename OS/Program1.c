#include<stdio.h>
#include<stdlib.h>
#include<dirent.h>
struct dirent *dptr;
int main(int argc ,char *argv[])
{
	char buff[100];
	DIR *dirp;
	printf("ENTER DIRECTORY NAME");
	scanf("%s",buff);
	if((dirp=opendir(buff))==NULL)
	{
		printf("The given directory is not exist"); 
		exit(1);
	}
	while(dptr=readdir(dirp))
	{
		printf("%s\n",dptr->d_name);
	}
	closedir(dirp);
}
