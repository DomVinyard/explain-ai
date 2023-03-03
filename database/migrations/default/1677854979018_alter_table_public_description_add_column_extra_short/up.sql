alter table "public"."description" add column "extra_short" text null;
UPDATE description SET extra_short = 'JavaScript makes websites do cool things like moving pictures.' WHERE topic_slug = 'javascript' AND audience = 5;
UPDATE description SET extra_short = 'JavaScript is a programming language for making websites interactive.' WHERE topic_slug = 'javascript' AND audience = 10;
UPDATE description SET extra_short = 'JavaScript is a language used to make websites interactive.' WHERE topic_slug = 'javascript' AND audience = 20;
UPDATE description SET extra_short = 'HTML makes websites with pictures and words.' WHERE topic_slug = 'html' AND audience = 5;
UPDATE description SET extra_short = 'HTML is used to create web pages with text and pictures.' WHERE topic_slug = 'html' AND audience = 10;
UPDATE description SET extra_short = 'HTML is a code used to create web pages.' WHERE topic_slug = 'html' AND audience = 20;
UPDATE description SET extra_short = 'CSS makes websites look beautiful with colors and styles.' WHERE topic_slug = 'css' AND audience = 5;
UPDATE description SET extra_short = 'CSS makes websites look pretty and stylish.' WHERE topic_slug = 'css' AND audience = 10;
UPDATE description SET extra_short = 'CSS is used to make web pages look pretty.' WHERE topic_slug = 'css' AND audience = 20;
UPDATE description SET extra_short = 'React helps make websites fun to use and explore.' WHERE topic_slug = 'react' AND audience = 5;
UPDATE description SET extra_short = 'React helps make websites look cool and work fast.' WHERE topic_slug = 'react' AND audience = 10;
UPDATE description SET extra_short = 'React is a JavaScript library for building user interfaces.' WHERE topic_slug = 'react' AND audience = 20;

