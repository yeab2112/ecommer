import {Contact} from "../moduls/contact.js"

const Contacts=async (req, res) => {
    try {
    const { name, email,phone ,message } = req.body;
    
     if (!name || !email ||!phone|| !message) {
     return res.status(400).json({ error: 'Missing required fields' })};
     {
    const newContact = new Contact({ phone,name, email, message });
    
    await newContact.save();
    
    res.status(201).json({ message: 'Contact submitted successfully' }) };
     }catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to submit contact' });
    }
    };
    export{Contacts};
    const Contactt= async(req, res) => {
        try {
          const contacts = await Contact.find();
          res.status(200).json(contacts);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching contacts' });
        }
      };
      export{Contactt}