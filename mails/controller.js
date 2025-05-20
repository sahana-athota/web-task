import MailSchema from "./model.js";

export const createMail = async (req, res) => {
  const { sender, reciever, type, body } = req.body;
  try {
    const mail = new MailSchema({
      sender,
      reciever,
      type,
      body,
    });
    mail.save();
    res.status(201).json(mail);
  } catch (error) {
    res.status(500).json({ message: "Error creating mail", error });
  }
};

export const getMails = async (req, res) => {
  try {
    const mails = await MailSchema.find();
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMail = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMail = await MailSchema.findByIdAndDelete(id);
    res.status(200).json(deleteMail);
  } catch (error) {
    res.status(500).json({ message: "Error deleting mail", error });
  }
};

export const starMail = async (req, res) => {
  const id  = req.body.id;
  try {
    const mail = await MailSchema.findById(id);
    const starVal = !mail.starred;
    const updatedMail = await MailSchema.findByIdAndUpdate(
      id,
      { $set: { starred: starVal } }, 
      { new: true, runValidators: true } 
  );
  console.log("starred successfully");
  res.status(200).json(updatedMail);
  } catch (error) {
    res.status(500).json({ message: "Error starring mail", error });
  }
};

export const markAsRead = async (req, res) => { //export keyword wasnt there
  const id  = req.body.id; //not req.params
  try {
    const mail = await MailSchema.findById(id);
    var status = mail.status; 
    if(status=='seen'){status='unseen';}
    else{status='seen';}
    const updatedMail = await MailSchema.findByIdAndUpdate(
        id,
        { $set: { status: status } }, 
        { new: true, runValidators: true } 
    );
    console.log("mar successfully");
    res.status(200).json(updatedMail);
  } catch (error) {
    res.status(500).json({ message: "Error marking mail as read", error });
  }
};
