const users = [
  {
    gender: "male",
    name: {
      title: "monsieur",
      first: "björn",
      last: "marie"
    },
    email: "björn.marie@example.com",
    dob: {
      date: "1946-01-20T06:46:49Z",
      age: 73
    },
    phone: "(257)-656-5558"
  },
  {
    gender: "female",
    name: {
      title: "mrs",
      first: "vildan",
      last: "koçyiğit"
    },
    email: "vildan.koçyiğit@example.com",
    dob: {
      date: "1983-10-06T11:45:41Z",
      age: 35
    },
    phone: "(534)-656-0837"
  },
  {
    gender: "female",
    name: {
      title: "mrs",
      first: "phoebe",
      last: "richards"
    },
    email: "phoebe.richards@example.com",
    dob: {
      date: "1971-04-05T03:01:45Z",
      age: 48
    },
    phone: "011-095-8991"
  },
  {
    gender: "female",
    name: {
      title: "miss",
      first: "غزل",
      last: "یاسمی"
    },
    email: "غزل.یاسمی@example.com",
    dob: {
      date: "1982-10-12T07:42:55Z",
      age: 36
    },
    phone: "065-42041074"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "philip",
      last: "young"
    },
    email: "philip.young@example.com",
    dob: {
      date: "1947-10-14T08:57:54Z",
      age: 71
    },
    phone: "387-873-3603"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "etienne",
      last: "roy"
    },
    email: "etienne.roy@example.com",
    dob: {
      date: "1953-07-19T01:21:42Z",
      age: 65
    },
    phone: "354-807-2917"
  },
  {
    gender: "female",
    name: {
      title: "ms",
      first: "debbie",
      last: "wagner"
    },
    email: "debbie.wagner@example.com",
    dob: {
      date: "1947-05-24T03:43:49Z",
      age: 72
    },
    phone: "(245)-342-1252"
  },
  {
    gender: "male",
    name: {
      title: "monsieur",
      first: "tobias",
      last: "blanc"
    },
    email: "tobias.blanc@example.com",
    dob: {
      date: "1975-02-28T14:20:17Z",
      age: 44
    },
    phone: "(362)-675-5125"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "babür",
      last: "tüzün"
    },
    email: "babür.tüzün@example.com",
    dob: {
      date: "1973-07-05T17:18:10Z",
      age: 45
    },
    phone: "(665)-074-1676"
  },
  {
    gender: "female",
    name: {
      title: "miss",
      first: "iina",
      last: "lehtinen"
    },
    email: "iina.lehtinen@example.com",
    dob: {
      date: "1990-07-26T00:07:11Z",
      age: 28
    },
    phone: "05-576-218"
  },
  {
    gender: "female",
    name: {
      title: "mrs",
      first: "olivia",
      last: "addy"
    },
    email: "olivia.addy@example.com",
    dob: {
      date: "1984-08-01T06:55:31Z",
      age: 34
    },
    phone: "885-461-8524"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "vernon",
      last: "koolhaas"
    },
    email: "vernon.koolhaas@example.com",
    dob: {
      date: "1986-08-01T07:05:34Z",
      age: 32
    },
    phone: "(406)-885-2972"
  },
  {
    gender: "female",
    name: {
      title: "miss",
      first: "jackie",
      last: "lewis"
    },
    email: "jackie.lewis@example.com",
    dob: {
      date: "1983-06-18T20:06:15Z",
      age: 35
    },
    phone: "03-0297-4969"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "مانی",
      last: "احمدی"
    },
    email: "مانی.احمدی@example.com",
    dob: {
      date: "1983-07-04T04:01:00Z",
      age: 35
    },
    phone: "062-74501928"
  },
  {
    gender: "female",
    name: {
      title: "ms",
      first: "laura",
      last: "dumas"
    },
    email: "laura.dumas@example.com",
    dob: {
      date: "1963-04-18T08:31:15Z",
      age: 56
    },
    phone: "01-58-33-39-84"
  },
  {
    gender: "female",
    name: {
      title: "mrs",
      first: "kelly",
      last: "thomas"
    },
    email: "kelly.thomas@example.com",
    dob: {
      date: "1994-12-15T14:31:49Z",
      age: 24
    },
    phone: "016974 66296"
  },
  {
    gender: "female",
    name: {
      title: "ms",
      first: "safina",
      last: "tuinstra"
    },
    email: "safina.tuinstra@example.com",
    dob: {
      date: "1957-05-22T15:43:32Z",
      age: 62
    },
    phone: "(828)-430-7986"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "donald",
      last: "hoffman"
    },
    email: "donald.hoffman@example.com",
    dob: {
      date: "1983-07-10T01:20:48Z",
      age: 35
    },
    phone: "051-324-8847"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "ted",
      last: "martin"
    },
    email: "ted.martin@example.com",
    dob: {
      date: "1992-01-07T05:02:06Z",
      age: 27
    },
    phone: "011-121-4976"
  },
  {
    gender: "female",
    name: {
      title: "miss",
      first: "tracy",
      last: "murray"
    },
    email: "tracy.murray@example.com",
    dob: {
      date: "1977-08-15T08:24:25Z",
      age: 41
    },
    phone: "01-4385-5089"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "noah",
      last: "french"
    },
    email: "noah.french@example.com",
    dob: {
      date: "1989-01-12T01:54:14Z",
      age: 30
    },
    phone: "811-366-2595"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "alexandre",
      last: "lavoie"
    },
    email: "alexandre.lavoie@example.com",
    dob: {
      date: "1996-02-02T22:07:12Z",
      age: 23
    },
    phone: "291-750-3209"
  },
  {
    gender: "female",
    name: {
      title: "ms",
      first: "sheila",
      last: "douglas"
    },
    email: "sheila.douglas@example.com",
    dob: {
      date: "1956-08-06T18:18:53Z",
      age: 62
    },
    phone: "(277)-168-5544"
  },
  {
    gender: "female",
    name: {
      title: "miss",
      first: "patricia",
      last: "barnes"
    },
    email: "patricia.barnes@example.com",
    dob: {
      date: "1965-07-19T19:09:55Z",
      age: 53
    },
    phone: "016977 68794"
  },
  {
    gender: "female",
    name: {
      title: "mrs",
      first: "ege",
      last: "babacan"
    },
    email: "ege.babacan@example.com",
    dob: {
      date: "1978-02-02T18:32:46Z",
      age: 41
    },
    phone: "(449)-992-4803"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "alexander",
      last: "sørensen"
    },
    email: "alexander.sørensen@example.com",
    dob: {
      date: "1952-01-28T21:24:43Z",
      age: 67
    },
    phone: "03146551"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "anton",
      last: "halonen"
    },
    email: "anton.halonen@example.com",
    dob: {
      date: "1950-10-23T11:42:16Z",
      age: 68
    },
    phone: "04-515-644"
  },
  {
    gender: "female",
    name: {
      title: "miss",
      first: "luisa",
      last: "cabrera"
    },
    email: "luisa.cabrera@example.com",
    dob: {
      date: "1992-03-03T10:43:51Z",
      age: 27
    },
    phone: "919-332-638"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "mads",
      last: "graafland"
    },
    email: "mads.graafland@example.com",
    dob: {
      date: "1945-01-05T17:50:43Z",
      age: 74
    },
    phone: "(467)-259-9368"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "götz",
      last: "helfrich"
    },
    email: "götz.helfrich@example.com",
    dob: {
      date: "1992-06-30T00:00:29Z",
      age: 26
    },
    phone: "0153-7632394"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "jesse",
      last: "williams"
    },
    email: "jesse.williams@example.com",
    dob: {
      date: "1994-11-27T04:32:18Z",
      age: 24
    },
    phone: "041-487-7372"
  },
  {
    gender: "female",
    name: {
      title: "ms",
      first: "becky",
      last: "cook"
    },
    email: "becky.cook@example.com",
    dob: {
      date: "1947-12-16T18:11:17Z",
      age: 71
    },
    phone: "016977 7377"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "henry",
      last: "bowman"
    },
    email: "henry.bowman@example.com",
    dob: {
      date: "1985-11-25T18:57:25Z",
      age: 33
    },
    phone: "06-1662-1049"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "spike",
      last: "flierman"
    },
    email: "spike.flierman@example.com",
    dob: {
      date: "1970-04-22T07:49:02Z",
      age: 49
    },
    phone: "(881)-644-8162"
  },
  {
    gender: "female",
    name: {
      title: "mrs",
      first: "angeles",
      last: "carrasco"
    },
    email: "angeles.carrasco@example.com",
    dob: {
      date: "1989-12-31T18:30:04Z",
      age: 29
    },
    phone: "924-285-747"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "malthe",
      last: "johansen"
    },
    email: "malthe.johansen@example.com",
    dob: {
      date: "1962-08-26T06:13:11Z",
      age: 56
    },
    phone: "41834661"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "hermann-josef",
      last: "flemming"
    },
    email: "hermann-josef.flemming@example.com",
    dob: {
      date: "1952-10-23T13:15:47Z",
      age: 66
    },
    phone: "0595-6997818"
  },
  {
    gender: "female",
    name: {
      title: "ms",
      first: "olivia",
      last: "elliott"
    },
    email: "olivia.elliott@example.com",
    dob: {
      date: "1966-10-17T16:22:47Z",
      age: 52
    },
    phone: "041-980-0469"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "okan",
      last: "velioğlu"
    },
    email: "okan.velioğlu@example.com",
    dob: {
      date: "1975-12-28T17:43:49Z",
      age: 43
    },
    phone: "(775)-979-6505"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "hans",
      last: "hildre"
    },
    email: "hans.hildre@example.com",
    dob: {
      date: "1974-10-24T06:00:45Z",
      age: 44
    },
    phone: "84483907"
  },
  {
    gender: "female",
    name: {
      title: "ms",
      first: "martinha",
      last: "castro"
    },
    email: "martinha.castro@example.com",
    dob: {
      date: "1981-05-11T12:34:16Z",
      age: 38
    },
    phone: "(21) 9999-0845"
  },
  {
    gender: "female",
    name: {
      title: "mrs",
      first: "andrea",
      last: "moreno"
    },
    email: "andrea.moreno@example.com",
    dob: {
      date: "1973-09-16T07:36:17Z",
      age: 45
    },
    phone: "917-971-411"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "jamie",
      last: "olaisen"
    },
    email: "jamie.olaisen@example.com",
    dob: {
      date: "1994-03-04T09:58:20Z",
      age: 25
    },
    phone: "85422767"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "randy",
      last: "robertson"
    },
    email: "randy.robertson@example.com",
    dob: {
      date: "1959-07-03T19:34:46Z",
      age: 59
    },
    phone: "019467 13861"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "شایان",
      last: "نكو نظر"
    },
    email: "شایان.نكونظر@example.com",
    dob: {
      date: "1968-05-01T06:07:17Z",
      age: 51
    },
    phone: "015-11841708"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "zackary",
      last: "ouellet"
    },
    email: "zackary.ouellet@example.com",
    dob: {
      date: "1972-11-27T18:08:15Z",
      age: 46
    },
    phone: "914-888-8927"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "flenn",
      last: "butler"
    },
    email: "flenn.butler@example.com",
    dob: {
      date: "1955-04-21T06:00:33Z",
      age: 64
    },
    phone: "021-459-9092"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "isaiah",
      last: "wright"
    },
    email: "isaiah.wright@example.com",
    dob: {
      date: "1959-11-01T21:08:17Z",
      age: 59
    },
    phone: "017684 02487"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "سپهر",
      last: "صدر"
    },
    email: "سپهر.صدر@example.com",
    dob: {
      date: "1953-12-12T00:47:14Z",
      age: 65
    },
    phone: "088-26346793"
  },
  {
    gender: "male",
    name: {
      title: "mr",
      first: "anthony",
      last: "collins"
    },
    email: "anthony.collins@example.com",
    dob: {
      date: "1956-07-19T23:49:25Z",
      age: 62
    },
    phone: "021-781-4720"
  }
];

const staffs = [];
for (let i = 0; i < 50; i++) {
  staffs.push({
    staff_id: (i + 1).toString(),
    student_id: "61130500299",
    name: users[Math.floor(Math.random() * 50)].name.first,
    surname: users[Math.floor(Math.random() * 50)].name.last,
    role: Math.floor(Math.random() * 6 + 1).toString()
  });
}
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("jpc_xv_staffs")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("jpc_xv_staffs").insert(staffs);
    });
};
