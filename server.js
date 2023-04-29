import express from "express";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const app = express();
const supaUrl = "https://zyaggwtenqbyfjgltiiv.supabase.co";
const supaAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5YWdnd3RlbnFieWZqZ2x0aWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4MDg3MTQsImV4cCI6MTk5ODM4NDcxNH0.mKZpGylaDpt8ZdL24b44U77y9mQS-bhTh8kSeBGi31I";
const supaClient = createClient(supaUrl, supaAnonKey);

app.use(express.static(path.join(".", 'dist')));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(".", 'dist', 'index.html'));
});

app.get('/api/puns', async (req,res) => {
    try {
      const { data: puns, error } = await supaClient.from('puns').select('*');
  
      if (error) {
        // console.error(error);
        // return res.status(500).send('Error retrieving puns from database');
        throw error;
      }
  
      res.send(puns);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving puns from database');
    }
});


app.post('/api/puns', async (req, res) => {
    const { pun } = req.body;
  
    try {
      const { data: newPun, error } = await supaClient
        .from('puns')
        .insert({ pun })
        .single();
  
      if (error) {
        console.error(error);
        return res.status(500).send('Error adding pun to database');
      }
  
      res.send(newPun);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding pun to database');
    }
  });


  app.put('/api/puns/:id', async (req, res) => {
    const { id } = req.params;
    const { pun } = req.body;
  
    try {
      const { data: updatedPun, error } = await supaClient
        .from('puns')
        .update({ pun })
        .eq('id', id)
        .single();
  
      if (error) {
        console.error(error);
        return res.status(500).send('Error updating pun in database');
      }
  
      res.send(updatedPun);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating pun in database');
    }
  });

  
app.delete('/api/puns/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const { data: deletedPun, error } = await supaClient
        .from('puns')
        .delete()
        .eq('id', id)
        .single();
  
      if (error) {
        console.error(error);
        return res.status(500).send('Error deleting pun from database');
      }
  
      res.send(deletedPun);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting pun from database');
    }
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});

