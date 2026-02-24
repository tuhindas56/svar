CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN 
    NEW.modified = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_forms_modtime
BEFORE UPDATE ON forms 
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();