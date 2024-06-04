const { Profile } = require("./models/profile");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    "email": "elon.musk@reqres.in",
    "first_name": "Elon",
    "last_name": "Musk",
    "avatar": "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
  },
  {
    "email": "jeff.bezos@reqres.in",
    "first_name": "Jeff",
    "last_name": "Bezos",
    "avatar": "https://pbs.twimg.com/profile_images/1591558315254890500/ETIHb4Nl_400x400.jpg"
  },
  {
    "email": "tim.cook@reqres.in",
    "first_name": "Tim",
    "last_name": "Cook",
    "avatar": "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
  },
  {
    "email": "larry.page@reqres.in",
    "first_name": "Larry",
    "last_name": "Page",
    "avatar": "https://pbs.twimg.com/profile_images/1231038234/page_400x400.jpg"
  },
  {
    "email": "mark.zuckerberg@reqres.in",
    "first_name": "Mark",
    "last_name": "Zuckerberg",
    "avatar": "https://pbs.twimg.com/profile_images/77846223/profile_400x400.jpg"
  },
  {
    "email": "bill.gates@reqres.in",
    "first_name": "Bill",
    "last_name": "Gates",
    "avatar": "https://pbs.twimg.com/profile_images/1674815862879178752/nTGMV1Eo_400x400.jpg"
  },
  {
    "email": "sam.altman@reqres.in",
    "first_name": "Sam",
    "last_name": "Altman",
    "avatar": "https://pbs.twimg.com/profile_images/804990434455887872/BG0Xh7Oa_400x400.jpg"
  },
  {
    "email": "satya.nadella@reqres.in",
    "first_name": "Satya",
    "last_name": "Nadella",
    "avatar": "https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
  },
  {
    "email": "sundar.pichai@reqres.in",
    "first_name": "Sundar",
    "last_name": "Pichai",
    "avatar": "https://pbs.twimg.com/profile_images/1710036756731510784/FyfFgM-B_400x400.jpg"
  },
  {
    "email": "larry.ellison@reqres.in",
    "first_name": "Larry",
    "last_name": "Ellison",
    "avatar": "https://pbs.twimg.com/profile_images/1708942630984495104/b-GDKzEe_400x400.jpg"
  },
  {
    "email": "steve.jobs@reqres.in",
    "first_name": "Steve",
    "last_name": "Jobs",
    "avatar": "https://pbs.twimg.com/profile_images/1155917668697985025/w4N0eB1E_400x400.jpg"
  },
  {
    "email": "jensen.huang@reqres.in",
    "first_name": "Jensen",
    "last_name": "Huang",
    "avatar": "https://pbs.twimg.com/profile_images/1496815845430886400/cmASyBx1_400x400.png"
  }
]

async function seed() {
  await mongoose.connect(config.get("db"));

  await Profile.deleteMany({});

  await Profile.insertMany(data);

  mongoose.disconnect();

  console.info("Done!");
}

seed();
