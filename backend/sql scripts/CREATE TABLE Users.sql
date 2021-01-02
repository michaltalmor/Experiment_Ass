CREATE TABLE [dbo].[Users](
	[UniqueID] [UNIQUEIDENTIFIER] PRIMARY KEY NOT NULL default NEWID(),
	[name] [varchar] (30) NOT NULL,
	[email] [varchar] (300) NOT NULL,
	[ID] [varchar] (30) NOT NULL,
)

        