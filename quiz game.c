//you can add your own questions in this code.
// M.H.V.N.PAVAN KUMAR DATE 17-04-2024
#include<stdio.h>
#include<stdlib.h>
int main()
{
	char s[100];
	int i,sum=0;
	int ans1,ans2,ans3,ans4,ans5;
	int point1,point2,point3,point4,point5;
	int point01,point02,point03,point04,point05;
	printf("press 1 to play game\n");
	printf("press 0  to quit game\n");
	scanf("%d",&i);
	if(i==1)
	{
		printf("you have enterd the game\n");
		printf("ENTER YOUR NAME:\n");
		scanf("%s",s);
		printf("Hello!  %s welcome to the game\n",s);
		
	}
	else if(i==0)
	{
		printf("you have quit the game\n");
		
	}
	else
	{
		printf("invalid option.enter a valid option to procced\n");
	}
	
	if(i==1)
	{
		printf("a)who is the captain of RCB?\n\n");
		printf("1)%s\n",s);
		printf("2)Faf duplesis\n");
		printf("3)M.S dhoni\n");
		printf("4)virat kohli\n");
		 
		 printf("ENTER YOUR ANSWER\n");
		scanf("%d",&ans1);
		if(ans1==1)
		{
			
			printf("your answer is correct\n");
			point1=5;
			printf("you had got %d points\n",point1);
		}
		else
		{
			
			printf("you have entered wrong answer\n");
			point01=0;
			printf("you had got %d points\n",point01);
		}
		printf("b)THE SUM OF IPL CUPS OF CSK,RCB AND MI HAVE?\n\n");
		printf("1)5\n");
		printf("2)0\n");
		printf("3)4\n");
		printf("4)10\n");
		printf("ENTER YOUR ANSWER\n");
		scanf("%d",&ans2);
		if(ans2==4)
		{
			
			printf("your answer is correct\n");
			point2=5;
			printf("you had got %d points\n",point2);
		}
		else
		{
			
			printf("you have entered wrong answer\n");
			point02=0;
			printf("you had got %d points\n",point02);
		}
		printf("c)WHICH TEAM HAS MORE NUMBER OF ORANGE CAP BOWLERS?\n\n");
		printf("1)DC\n");
		printf("2)RCB\n");
		printf("3)LSG\n");
		printf("4)CSK\n");
		printf("ENTER YOUR ANSWER\n");
		scanf("%d",&ans3);
		if(ans3==2)
		{
			
			printf("your answer is correct\n");
			point3=5;
			printf("you had got %d points\n",point3);
		}
		else
		{
			
			printf("you have entered wrong answer\n");
			point03=0;
			printf("you had got %d points\n",point03);
		}
		printf("d)REASON BEHIND RCB SCORED LOWEST SCORE 49 IN IPL?\n\n");
		printf("1)Thala for reason:7x7=49 \n");
		printf("2)no reason\n");
		printf("3)That is the capability of RCB\n");
		printf("4)Because of great batsman in the team\n");
		printf("ENTER YOUR ANSWER\n");
		scanf("%d",&ans4);
		if(ans4==1)
		{
			
			printf("your answer is correct\n");
			point4=5;
			printf("you had got %d points\n",point4);
		}
		else
		{
			
			printf("you have entered wrong answer\n");
			point04=0;
			printf("you had got %d points\n",point04);
		}
		printf("c)WHICH TEAM WILL WIN IPL 2024?\n\n");
		printf("1)CSK\n");
		printf("2)MI\n");
		printf("3)SRH\n");
		printf("4)RCB\n");
		printf("ENTER YOUR ANSWER\n");
		scanf("%d",&ans5);
		if(ans5==3)
		{
			
			printf("your answer is correct\n");
			point5=5;
			printf("you had got %d points\n",point5);
		}
		else if(ans5==1)
		{
		
		printf("ok!There is a chance but wrong answer\n");
		point05=0;
			printf("you had got %d points\n",point05);
		}
		else if(ans5==2)
		{
			
			printf("NO there is no chance for this year\n");
			point05=0;
			printf("you had got %d points\n",point05);
		}
		else
		{
			printf("siggundali ra ee option choose cheyadaniki\n");
			printf("sarle any ways answer elago thappu\n");	
			point05=0;
			printf("you had got %d points\n",point05);
			
			
		}	
		
	}
	
	printf("Thanks for playing!");	
}
