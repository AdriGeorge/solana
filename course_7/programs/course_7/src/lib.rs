use anchor_lang::prelude::*;

declare_id!("5Ax2RjTSZp5rSnfDSyojXnBKfeUEGZ5WKhEV8bvZAjjJ");

#[program]
pub mod course_7 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
