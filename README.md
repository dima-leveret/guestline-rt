To build the project locally you need:
1. Git 
2. node.js

Instruction:

- Clone the repository to your computer:
    open the terminal and paste/write the command below
{
    git clone https://github.com/dima-leveret/guestline-rt
}

2. Enter the repo:
{
    cd [name of the repo]
    for example
    cd guestline-rt
}

3. Install all dependencies:
    being in the repo and paste/write the command below
{
    npm install
    or
    npm i
}

4. Run the project:
    use the command below
{
    npm start
}

In case you are not succeed in building the project locally I attach a link to project:

https://dima-leveret.github.io/guestline-rt/


About the project:

On the main page you will see the list of hotels.
You can filter the hotels by stars rating. Select stars and click on FILTER HOTELS button.
The RESET button will reset the number of stars to 1.

Clicking on the name of the hotel will provide you to the list of room of selected hotel.
You can filter rooms by occupancy. For that you can set the  number of adults and children and push FILTER ROOMS button.
If you achieve the max number of adults or children from the whole list of rooms the the number will stop updating.
The RESET button will reset the number of adults and children to 0.
