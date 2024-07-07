#include<stdio.h>
int main()
{
int i,n,j,f;
  printf("in this code we can find the no of prime num below the givevn number");
  printf("enter the nummber");
scanf("%d",&n);

for(i=1;i<=n;i++)
{
f=0;
for(j=1;j<=i;j++)
 {if(i%j==0)
 f++;}

if(f==2)
printf("%d ",i);
}
}
