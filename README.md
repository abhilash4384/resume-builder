# Resume Builder

Designing a resume in Word has always been a frustrating experience, from selecting the right fonts and colors to dealing with formatting issues and more. While there are plenty of online resume builders available, they often come at a cost or include watermarks from the website. As a software engineer, I've decided to develop a user-friendly resume builder application to provide a hassle-free experience for creating resumes.

The app I've developed is primarily targeted towards software engineers and offers a straightforward approach for building resumes. While it may not have an extensive range of features and layouts, it aims to serve as a simple solution. Additionally, this app serves as an opportunity for me to explore various technologies, such as React, React Hook Form, Jotai, and more.

<center>
<img src="./walkthrough.gif" height="300" width="500">
</center>

## Live Preview

Try out generating your own resume on
<a href="https://master--gleeful-figolla-2abbff.netlify.app/">this</a> link.

## Features

- Fill the form and download resume in pdf format(make sure while to select print destination Save as PDF insted of Microsoft print to PDF, otherwise the resume hyperlinks will not work)
- Fill the form and download JSON file containing all the infomration previously filled in the form
- Import this `.json` file to autofill form
- On the resume page user can click on the image and upload new image (this feature only works on desktop website as for mobile screen no preview option is available)

### Install Dependecies

    yarn

### Run App

    yarn dev

### Build App

    yarn build

### Run Build Preview

    yarn preview

## Tech Stack

    React 18, jotai, react hook form, yup, material UI, SASS/SCSS, react-to-print, typescript
