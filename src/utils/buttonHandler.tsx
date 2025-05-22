export   const buttonHandlers: Record<string, (methods: any) => void> = {
    sendOtpHandler: ({ getValues, setValue, setError, clearErrors }) => {
      const email = getValues('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');
      const otpInput = document.querySelector<HTMLInputElement>('input[name="otp"]');

      if (!emailRegex.test(email)) {
        setError('email', { type: 'manual', message: 'Please enter a valid email before sending OTP' });
        if (emailInput) emailInput.disabled = false;
        if (otpInput) otpInput.disabled = true;
        return;
      }

      console.log('Sending OTP to:', email);

      clearErrors('email');
      setValue('otp', '');
      if (emailInput) emailInput.disabled = true;
      if (otpInput) otpInput.disabled = false;
    }
  };