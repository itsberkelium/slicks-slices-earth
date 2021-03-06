const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next <strong>20 mins</strong>.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}" />
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup.</p>

    <style>
        ul {
          list-style: none;
        }

        ul li {
          display: flex;
          align-items: center;
          margin: 5px 0;
        }

        img {
          border-radius: 4px;
          margin-right: 10px;
        }
    </style>
  </div>`;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const wait = async (ms = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

exports.handler = async (event, context) => {
  await wait(2000);
  const body = JSON.parse(event.body);

  if (body.pandas)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boo beep bop zzzstt good bye | Error: 440',
      }),
    };

  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field])
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You're missing the ${field} field.`,
        }),
      };
  }

  if (!body.order.length)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops! You're not ordering anything?`,
      }),
    };

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success!' }),
  };
};
