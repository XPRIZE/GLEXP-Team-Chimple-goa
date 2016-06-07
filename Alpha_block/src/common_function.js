	function checkWord(string)
	{
			var start = 0;
			var end = dict.b.length-1;
			var mid = (start+end)/2;
			
			if(string.length==2)
			{
				var a1 = string[0];
				var a2 = string[1];
			
				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
//					console.log(element.length);
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2 && element.length==string.length)
						{
							break;
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(string.length==3)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];

				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3 && element.length==string.length)
							{
								break;
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(string.length==4)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];

				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4 && element.length==string.length)
								{
									break;
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}

			if(string.length==5)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];

				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5 && element.length==string.length)
									{
										break;
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			if(string.length==6)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];

				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6 && element.length==string.length)
										{
											break;
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			
			if(string.length==7)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];

				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7 && element.length==string.length)
											{
												break;
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			
			
			if(string.length==8)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];

				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8 && element.length==string.length)
												{
													break;
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
			
			
			if(string.length==9)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];

				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9 && element.length==string.length)
													{
														break;
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
        
        
        
			if(string.length==10)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];
                var a10 = string[9];
                
				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && a10 == element.charAt(9)  && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9)
													{
                                                        if(element.charAt(9) < a10)
                                                        {
                                                            start = mid+1;
                                                        }
                                                        else if(element.charAt(9) == a10 && element.length==string.length)
                                                        {
                                                            break;
                                                        }
                                                        else
                                                        {
                                                            end = mid-1;
                                                        }
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
        
        
			if(string.length==11)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];
                var a10 = string[9];
                var a11 = string[10];
                
				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && a10 == element.charAt(9) && a11 == element.charAt(10) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9)
													{
                                                        if(element.charAt(9) < a10)
                                                        {
                                                            start = mid+1;
                                                        }
                                                        else if(element.charAt(9) == a10)
                                                        {
                                                            if(element.charAt(10) < a11)
                                                            {
                                                                start = mid+1;
                                                            }
                                                            else if(element.charAt(10) == a11 && element.length==string.length)
                                                            {
                                                                break;
                                                            }
                                                            else
                                                            {
                                                                end = mid-1;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            end = mid-1;
                                                        }
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
            
        
			if(string.length==12)
			{
				var a1 = string[0];
				var a2 = string[1];
				var a3 = string[2];
				var a4 = string[3];
				var a5 = string[4];
				var a6 = string[5];
				var a7 = string[6];
				var a8 = string[7];
				var a9 = string[8];
                var a10 = string[9];
                var a11 = string[10];
                var a12 = string[11];
                
				while(start<=end)
				{
					mid = ~~mid;

					var element = dict.b[mid];
					if(element.charAt(0) < a1)// && element.charAt(1) < a2 && element.charAt(2) < a3 && element.length==len)
					{
						start = mid+1;
					}
					else if(a1 == element.charAt(0) && a2 == element.charAt(1)  && a3 == element.charAt(2) && a4 == element.charAt(3) && a5 == element.charAt(4) && a6 == element.charAt(5) && a7 == element.charAt(6) && a8 == element.charAt(7) && a9 == element.charAt(8) && a10 == element.charAt(9) && a11 == element.charAt(10) && a12 == element.charAt(11) && element.length==string.length)
					{
						break;
					}
					else if(element.charAt(0) == a1)
					{
						if(element.charAt(1) < a2)
						{
							start = mid+1;
						}
						else if(element.charAt(1) == a2)
						{
							if(element.charAt(2) < a3)
							{
								start = mid+1;
							}
							else if(element.charAt(2) == a3)
							{
								if(element.charAt(3) < a4)
								{
									start = mid+1;
								}
								else if(element.charAt(3) == a4)
								{
									if(element.charAt(4) < a5)
									{
										start = mid+1;
									}
									else if(element.charAt(4) == a5)
									{
										if(element.charAt(5) < a6)
										{
											start = mid+1;
										}
										else if(element.charAt(5) == a6)
										{
											if(element.charAt(6) < a7)
											{
												start = mid+1;
											}
											else if(element.charAt(6) == a7)
											{
												if(element.charAt(7) < a8)
												{
													start = mid+1;
												}
												else if(element.charAt(7) == a8)
												{
													if(element.charAt(8) < a9)
													{
														start = mid+1;
													}
													else if(element.charAt(8) == a9)
													{
                                                        if(element.charAt(9) < a10)
                                                        {
                                                            start = mid+1;
                                                        }
                                                        else if(element.charAt(9) == a10)
                                                        {
                                                            if(element.charAt(10) < a11)
                                                            {
                                                                start = mid+1;
                                                            }
                                                            else if(element.charAt(10) == a11)
                                                            {
                                                                if(element.charAt(11) < a12)
                                                                {
                                                                    start = mid+1;
                                                                }
                                                                else if(element.charAt(11) == a12 && element.length==string.length)
                                                                {
                                                                    break;
                                                                }
                                                                else
                                                                {
                                                                    end = mid-1;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                end = mid-1;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            end = mid-1;
                                                        }
													}
													else
													{
														end = mid-1;
													}
												}
												else
												{
													end = mid-1;
												}
											}
											else
											{
												end = mid-1;
											}
										}
										else
										{
											end = mid-1;
										}
									}
									else
									{
										end = mid-1;
									}
								}
								else
								{
									end = mid-1;
								}
							}
							else
							{
								end = mid-1;
							}
						}
						else
						{
							end = mid-1;
						}
					}
					else
					{
						end = mid-1;
					}
					mid = (start+end)/2;
				}
			}
        
			if(string.length<=1)
                return 0;
			else if(start>end)
				return 0;
			else
				return 1;
			
}

			function two(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						if(string.charAt(i)==string.charAt(j))
						{
						}
						else
						{
							var value = string.charAt(i)+''+string.charAt(j);
							check = checkWord(value);
							
							if(check==1)
							{
                                com = value;
								break;
							}
						}
					}
					
					if(check==1)
					{
						break;
					}
				}
                
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
			}
			
			
			function three(string, co)
			{
				var check;
                var com = 5;
				var arr = new Array();
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
							for(var l=0; l<string.length; l++)
							{
                                if((string.charAt(i)==string.charAt(j)) || (string.charAt(i)==string.charAt(l)) || (string.charAt(l)==string.charAt(j)))
                                {
                                }
                                else
                                {
                                    var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(l);
                                    check = checkWord(value);
                                
                                    if(check==1)
                                    {
                                        com = value;
                                        break;
                                    }
                                }
							}
							if(check==1)
							{
								break;
							}
					}
					if(check==1)
					{
						break;
					}
				}

                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
			}
			
			
			function four(string, co)
			{
                var com = 5;
				var arr = new Array();
				var check;
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						for(var k=0; k<string.length; k++)
						{
								for(var l=0; l<string.length; l++)
								{
									var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l);
									check = checkWord(value);
							
									if(check==1)
									{
                                        com = value;
										break;
									}
								}
									if(check==1)
									{
										break;
									}
						}
									if(check==1)
									{
										break;
									}
					}
									if(check==1)
									{
										break;
									}
				}
                
                if(co==5)
                    return com;
				else if(check==1)
					return 1;
				else
					return 0;
                
}

    function five(string, co)
    {
    var com = 5;
    var arr = new Array();
    var check;
    for(var i=0; i<string.length; i++)
    {
        for(var j=0; j<string.length; j++)
        {
            for(var k=0; k<string.length; k++)
            {
                for(var l=0; l<string.length; l++)
                {
                    for(var m=0; m<string.length; m++)
                    {
                        var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m);
                    //	check = check5(value, 5);
                        if(value.indexOf('0')>-1)
                        {
                            check = checkWord(value);
                        }
                        if(check==1)
                        {
                            com = value;
                            break;
                        }
                    }
                    if(check==1)
                    {
                        break;
                    }
                }
                if(check==1)
                {
                    break;
                }
            }
            if(check==1)
            {
                break;
            }
        }
        if(check==1)
        {
            break;
        }
    }

    if(co==5)
        return com;
    else if(check==1)
        return 1;
    else
        return 0;
    }

    function six(string, co)
    {
    var comb=5;
    var arr = new Array();
    var check;
    for(var i=0; i<string.length; i++)
    {
        for(var j=0; j<string.length; j++)
        {
            for(var k=0; k<string.length; k++)
            {
                for(var l=0; l<string.length; l++)
                {
                    for(var m=0; m<string.length; m++)
                    {
                        for(var n=0; n<string.length; n++)
                        {
                            var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n);
                        //	check = check6(value, 6);			
                            if(value.indexOf('0')==-1)
                            {
                                check = checkWord(value);
                            }
                            if(check==1)
                            {
                                comb = value;
                                break;
                            }
                        }
                        if(check==1)
                        {
                            break;
                        }
                    }
                    if(check==1)
                    {
                        break;
                    }
                }
                if(check==1)
                {
                    break;
                }
            }
            if(check==1)
            {
                break;
            }
        }
        if(check==1)
        {
            break;
        }
    }

    if(co==5)
        return comb;
    else if(check==1)
        return 1;
    else
        return 0;
    }	

    function seven(string, co)
    {
    var comb=5;
    var arr = new Array();
    var check;
    for(var i=0; i<string.length; i++)
    {
        for(var j=0; j<string.length; j++)
        {
            for(var k=0; k<string.length; k++)
            {
                for(var l=0; l<string.length; l++)
                {
                    for(var m=0; m<string.length; m++)
                    {
                        for(var n=0; n<string.length; n++)
                        {
                            for(var o=0; o<string.length; o++)
                            {
                                var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o);
                            //	check = check7(value, 7);
                                if(value.indexOf('0')==-1)
                                {
                                    check = checkWord(value);
                                }
                                if(check==1)
                                    {
                                        comb = value;
                                        break;
                                    }
                                    
                            }
                            if(check==1)
                                break;
                        }
                        if(check==1)
                            break;
                    }
                    if(check==1)
                        break;
                }
                if(check==1)
                    break;
            }
            if(check==1)
                break;
        }
        if(check==1)
            break;
    }

    if(co==5)
        return comb;
    else if(check==1)
        return 1;
    else
        return 0;
    }


    function eight(string, co)
    {
    var comb=5;
    var arr = new Array();
    var check;
    for(var i=0; i<string.length; i++)
    {
        for(var j=0; j<string.length; j++)
        {
            for(var k=0; k<string.length; k++)
            {
                for(var l=0; l<string.length; l++)
                {
                    for(var m=0; m<string.length; m++)
                    {
                        for(var n=0; n<string.length; n++)
                        {
                            for(var o=0; o<string.length; o++)
                            {
                                for(var p=0; p<string.length; p++)
                                {
                                    var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p);
    //												check = check8(value, 8);
                                    if(value.indexOf('0')==-1)
                                    {
                                        check = checkWord(value);
                                    }
                                    if(check==1)
                                        {
                                            comb = value;
                                            break;
                                        }
                                }
                                if(check==1)
                                    break;
                            }
                            if(check==1)
                                break;
                        }
                        if(check==1)
                            break;
                    }
                    if(check==1)
                        break;
                }
                if(check==1)
                    break;
            }
            if(check==1)
                break;
        }
        if(check==1)
            break;
    }

    if(co==5)
        return comb;
    else if(check==1)
        return 1;
    else
        return 0;
    }



    function nine(string, co)
    {
    var arr = new Array();
    var check;
    var comb=5;
    for(var i=0; i<string.length; i++)
    {
        for(var j=0; j<string.length; j++)
        {
            for(var k=0; k<string.length; k++)
            {
                for(var l=0; l<string.length; l++)
                {
                    for(var m=0; m<string.length; m++)
                    {
                        for(var n=0; n<string.length; n++)
                        {
                            for(var o=0; o<string.length; o++)
                            {
                                for(var p=0; p<string.length; p++)
                                {
                                    for(var q=0; q<string.length; q++)
                                    {
                                        var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p)+''+string.charAt(q);
    //													check = check9(value, 9);
                                        if(value.indexOf('0')==-1)
                                        {
                                            check = checkWord(value);
                                        }
                                        if(check==1)
                                            {
                                                break;
                                                comb = value;
                                            }
                                    }
                                    if(check==1)
                                        break;
                                }
                                if(check==1)
                                    break;
                            }
                            if(check==1)
                                break;
                        }
                        if(check==1)
                            break;
                    }
                    if(check==1)
                        break;
                }
                if(check==1)
                    break;
            }
            if(check==1)
                break;
        }
        if(check==1)
            break;
    }

    if(co==5)
        return comb;
    else if(check==1)
        return 1;
    else
        return 0;
    }


    function ten(string, co)
    {
    var com = 5;
    var arr = new Array();
    var check;
    for(var i=0; i<string.length; i++)
    {
        for(var j=0; j<string.length; j++)
        {
            for(var k=0; k<string.length; k++)
            {
                for(var l=0; l<string.length; l++)
                {
                    for(var m=0; m<string.length; m++)
                    {
                        for(var n=0; n<string.length; n++)
                        {
                            for(var o=0; o<string.length; o++)
                            {
                                for(var p=0; p<string.length; p++)
                                {
                                    for(var q=0; q<string.length; q++)
                                    {
                                        for(var r=0; r<string.length; r++)
                                        {
                                        var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p)+''+string.charAt(q)+''+string.charAt(r);
    //													check = check9(value, 9);

                                        check = checkWord(value);
                                        if(check==1)
                                            {
                                                com = value;
                                                break;
                                            }
                                        }
                                        if(check==1)
                                            {
                                                com = value;
                                                break;
                                            }
                                    }
                                    if(check==1)
                                        break;
                                }
                                if(check==1)
                                    break;
                            }
                            if(check==1)
                                break;
                        }
                        if(check==1)
                            break;
                    }
                    if(check==1)
                        break;
                }
                if(check==1)
                    break;
            }
            if(check==1)
                break;
        }
        if(check==1)
            break;
    }

    if(co==5)
        return com;
    else if(check==1)
        return 1;
    else
        return 0;
    }


    function eleven(string, co)
    {
    var com = 5;
    var arr = new Array();
    var check;
    for(var i=0; i<string.length; i++)
    {
        for(var j=0; j<string.length; j++)
        {
            for(var k=0; k<string.length; k++)
            {
                for(var l=0; l<string.length; l++)
                {
                    for(var m=0; m<string.length; m++)
                    {
                        for(var n=0; n<string.length; n++)
                        {
                            for(var o=0; o<string.length; o++)
                            {
                                for(var p=0; p<string.length; p++)
                                {
                                    for(var q=0; q<string.length; q++)
                                    {
                                        for(var r=0; r<string.length; r++)
                                        {
                                            for(var s=0; s<string.length; s++)
                                            {
                                                var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p)+''+string.charAt(q)+''+string.charAt(r)+''+string.charAt(s);
    //													check = check9(value, 9);

                                                check = checkWord(value);
                                                if(check==1)
                                                    {
                                                        com = value;
                                                        break;
                                                    }
                                            }
                                            if(check==1)
                                                break;
                                        }
                                        if(check==1)
                                            break;
                                    }
                                    if(check==1)
                                        break;
                                }
                                if(check==1)
                                    break;
                            }
                            if(check==1)
                                break;
                        }
                        if(check==1)
                            break;
                    }
                    if(check==1)
                        break;
                }
                if(check==1)
                    break;
            }
            if(check==1)
                break;
        }
        if(check==1)
            break;
    }

    if(co==5)
        return com;
    else if(check==1)
        return 1;
    else
        return 0;
    }


    function twelve(string, co)
    {
    var com = 5;
    var arr = new Array();
    var check;
    for(var i=0; i<string.length; i++)
    {
        for(var j=0; j<string.length; j++)
        {
            for(var k=0; k<string.length; k++)
            {
                for(var l=0; l<string.length; l++)
                {
                    for(var m=0; m<string.length; m++)
                    {
                        for(var n=0; n<string.length; n++)
                        {
                            for(var o=0; o<string.length; o++)
                            {
                                for(var p=0; p<string.length; p++)
                                {
                                    for(var q=0; q<string.length; q++)
                                    {
                                        for(var r=0; r<string.length; r++)
                                        {
                                            for(var s=0; s<string.length; s++)
                                            {
                                                for(var t=0; t<string.length; t++)
                                                {
                                                    var value = string.charAt(i)+''+string.charAt(j)+''+string.charAt(k)+''+string.charAt(l)+''+string.charAt(m)+''+string.charAt(n)+''+string.charAt(o)+''+string.charAt(p)+''+string.charAt(q)+''+string.charAt(r)+''+string.charAt(s)+''+string.charAt(t);
    //													check = check9(value, 9);

                                                    check = checkWord(value);
                                                    if(check==1)
                                                        {
                                                            com = value;
                                                            break;
                                                        }
                                                }
                                                if(check==1)
                                                    break;
                                            }
                                            if(check==1)
                                                break;
                                        }
                                        if(check==1)
                                            break;
                                    }
                                    if(check==1)
                                        break;
                                }
                                if(check==1)
                                    break;
                            }
                            if(check==1)
                                break;
                        }
                        if(check==1)
                            break;
                    }
                    if(check==1)
                        break;
                }
                if(check==1)
                    break;
            }
            if(check==1)
                break;
        }
        if(check==1)
            break;
    }

    if(co==5)
        return com;
    else if(check==1)
        return 1;
    else
        return 0;
    }