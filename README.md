# Qlert: Responsible AI Adoption Platform

![Banner Image](assets\banner.png)

## Table of Contents
1. [Objective](#objective)
2. [Implementation](#implementation)
    - [Automatic Rule Generation](#automatic-rule-generation)
    - [Real-time Risk Assessment](#real-time-risk-assessment)
    - [Admin Dashboard](#admin-dashboard)
3. [Applications](#applications)
4. [Final Result](#final-result)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Objective
Qlert aims to revolutionize AI usage by ensuring responsible and ethical adoption through the integration of automatic rule generation and real-time risk assessment mechanisms. By providing administrators with the tools to monitor user interactions and mitigate potential risks, Qlert promotes trust, transparency, and compliance in AI usage within organizations.

## Implementation

### Automatic Rule Generation
Qlert utilizes a Summarizer Language Model (LLM) to automatically generate rules from uploaded PDFs, with provisions for manual rule addition by administrators. These rules are then stored in a Qdrant Vector DB as embeddings, ensuring efficient storage and retrieval. Azure database is then used to store all queries made to LLMs and the the corresponding risk levels of these queries.
Below are some screenshots showcasing different features of Qlert:




### Real-time Risk Assessment
User queries trigger a similarity search on the vector DB to check for risky prompts, while output from LLM models also undergoes a similarity search. Risky prompts exceeding a threshold trigger alerts, with administrators notified via the admin dashboard. Simultaneously, users receive error responses to mitigate potential risks.
- **Real-time Risk Assessment:**
![Real-time Risk Assessment](assets\chat.png)

### Admin Dashboard
Qlert provides administrators with a comprehensive admin dashboard where they can view users querying risky content, monitor real-time graphical views of risky queries, and assess prompt injection attempts. Admins also have the authority to block user access if necessary.
- **Admin Dashboard:**
![Admin Dashboard](assets\admin.png)

## Applications
- Ensuring Responsible AI Usage
- Mitigating Potential Risks
- Enhancing Administrative Oversight

## Final Result
The final result of Qlert is a robust and scalable platform that promotes responsible and ethical AI adoption within organizations. With its automatic rule generation, real-time risk assessment, and comprehensive admin controls, Qlert enhances trust, transparency, and compliance in AI usage.
## Demo

assets\Qlert_demo.mp4

## Installation
Follow these steps to install Qlert on your local machine:

1. Clone the Qlert repository to your local machine:

   ```bash
   git clone https://github.com/Sreehari78/Qlert.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Qlert
   ```

3. Install the required dependencies. It is recommended to set up a virtual environment before installing dependencies:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'
   pip install -r requirement.txt
   ```

4. Run the development server:

   ```bash
   python server.py
   ```

5. Run client server:

   ```bash
   npm i
   npm run dev
   ```

6. Open your web browser and navigate to [http://127.0.0.1:3000/](http://127.0.0.1:3000/) to access Qlert.


## Usage
### Automatic Rule Generation

- Upload PDFs to automatically generate rules.
- Administrators can manually add rules.

### Real-time Risk Assessment

- User queries trigger a similarity search for risky prompts.
- Alerts are triggered for risky prompts exceeding a threshold.

### Admin Dashboard

- Monitor users querying risky content.
- Real-time graphical views of risky queries.
- Assess and control prompt injection attempts.

## Collaborators
- [Pranav S](https://github.com/prnv0)
- [Sreehari s](https://github.com/Sreehari78)
- [Akhil Vettical](https://github.com/AkhilVettical)
- [Richard Joseph](https://github.com/Richard-m-j)


