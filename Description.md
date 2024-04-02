# Description

# 1. Which package/library did you select?

P5JS

# 2. What is the package/library?

P5JS is a graphics library for JavaScript. It has built in features for loading assets, and rendering them to the screen. Be it fonts, images, or given input text it can render many things at a time to different parts on the screen. Most operations are still done using base javascript but P5JS integrates with the code in an easy to use and learn way which makes it feel as more of a simple conversion. Allowing all of the features of base JS to be used with a graphical aspect to them rendering to a given canvas.

# 3. What are the functionalities of the package/library?

[Link to full documentation](https://p5js.org/reference/)

Keyboard input [ref](https://p5js.org/reference/#/p5/keyIsDown)

    if (keyIsDown(UP_ARROW) && !holding)
		{
			dexIndex = (dexIndex - 1);
			if (dexIndex == -1)
			{
				dexIndex = Mons.length - 1;
			}
			hasloaded = false;
			holding = true;
		}

Rendering Text on the screen [ref](https://p5js.org/reference/#/p5/text)
![Shop view](<Markdown Images/image7.png>)

Rendering Images on the screen [ref](https://p5js.org/reference/#/p5.Image)\
Rendering primitive shapes to the screen (The health bars are dynamically shrinking rectangles) [ref(Rect)](https://p5js.org/reference/#/p5/rect)\
Change the color of giving things [ref](https://p5js.org/reference/#/p5/fill)
![Main Menu of battle screen](<Markdown Images/image4.png>)

# 4. When was it created?

2013

# 5. Why did you select this package/library?

I had searched through multiple language options and wanted to make something using an html related thing, but couldn't find one I had liked, trying racket and some others, then got the idea to make an html game and remembered hearing about p5js so decided to look into it and found it quite enjoyable. It is a simplistic graphical engine which could definitely be good for people starting out coding. But for those more experienced it allows a good amount of control for creating much more complex things using it's features in combination with the basic features of javascript.

# 6. How did learning the package/library influence your learning of the language?

It helped me immensely in getting familiar with the language. I was struggling with javascript before so I felt working with it for my exploration activity could help me understand it more and I had a lot of fun working on it so it definitely helped me feel better about it and understand the specific features much more. I was able to problem solve any issues I came across which helped grow my knowledge for future labs.

# 7. How was your overall experience with the package/library?

Overall it was quite enjoyable. I was not expecting to make as large of a game as I did but it was quite fun to do more and more things so I took it more as a side project than a proper assignment, working on it when I wanted to do something as the progress was pretty easy and rewarding, I will definitely use this engine in the future for projects as with the familiarity I have grown I know how to do many things easily. And unlike other options I have tried there is not much limitation on the end of the engine itself. Pygame struggled to run without optimization but as P5JS runs in an HTML it is much easier for it to run without as much lag even without perfectly optimized code.