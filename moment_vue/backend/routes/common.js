module.exports.age = function (rows) {
  const date = new Date();
  const ttoday = date.getFullYear();
  let m_age;
  rows.forEach((rdata) => {
    const rbirth = rdata.m_birth.toString();
    const mybirth = rbirth.slice(11, 15);
    m_age = eval(ttoday - mybirth + 1 + "");
    m_age = m_age.toString().slice(0, 1);
    rdata.m_age = m_age;
  });
  return rows;
};
