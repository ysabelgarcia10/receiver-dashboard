DROP TABLE IF EXISTS "receivers" CASCADE;
CREATE TABLE receivers (
  id SERIAL PRIMARY KEY NOT NULL,
  origLabel VARCHAR(20) NOT NULL,
  origRcvLine VARCHAR(10) NOT NULL,
  origRcvPoint VARCHAR(10) NOT NULL,
  origEasting DECIMAL(9,2) NOT NULL,
  origNorthing DECIMAL(8,2) NOT NULL,
  actualLabel VARCHAR(20) NOT NULL,
  actualEasting DECIMAL(9,2) NOT NULL,
  actualNorthing DECIMAL(8,2) NOT NULL,
  actualDateTime VARCHAR(50) NOT NULL
);